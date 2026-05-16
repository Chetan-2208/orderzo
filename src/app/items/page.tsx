"use client";

import { useState, useEffect } from 'react'
import Logo from '@/components/Logo'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Item {
  id: string
  name: string
  price: number
  active: boolean
  created_at?: string
}

interface Business {
  id: string
  business_name: string
}

export default function ItemsPage() {
  const [business, setBusiness] = useState<Business | null>(null)
  const [phone, setPhone] = useState('')
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editPrice, setEditPrice] = useState('')
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const savedPhone = localStorage.getItem('orderzo_user_phone')
    if (!savedPhone) { router.push('/login'); return }
    setPhone(savedPhone)
    loadBusinessAndItems(savedPhone)
  }, [router])

  const loadBusinessAndItems = async (phoneNum: string) => {
    const { data: businessData, error: businessError } = await supabase
      .from('businesses')
      .select('*')
      .eq('owner_phone', phoneNum)
      .single()

    if (businessError || !businessData) { router.push('/setup'); return }

    setBusiness(businessData)

    const { data: itemsData, error: itemsError } = await supabase
      .from('items')
      .select('*')
      .eq('business_id', businessData.id)
      .order('created_at', { ascending: false })

    if (!itemsError && itemsData) {
      setItems(itemsData)
    }

    setLoading(false)
  }

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!newName.trim()) { setError('Please enter item name'); return }

    const priceNum = parseFloat(newPrice)
    if (isNaN(priceNum) || priceNum <= 0) { setError('Please enter a valid price'); return }

    if (!business) return

    const { data, error: insertError } = await supabase
      .from('items')
      .insert({
        business_id: business.id,
        name: newName.trim(),
        price: priceNum,
        active: true,
      })
      .select()
      .single()

    if (insertError) { setError('Could not add item: ' + insertError.message); return }

    if (data) {
      setItems([data, ...items])
      setNewName('')
      setNewPrice('')
      setShowAddForm(false)
    }
  }

  const handleStartEdit = (item: Item) => {
    setEditingId(item.id)
    setEditName(item.name)
    setEditPrice(item.price.toString())
    setError('')
  }

  const handleSaveEdit = async (id: string) => {
    setError('')

    if (!editName.trim()) { setError('Item name cannot be empty'); return }

    const priceNum = parseFloat(editPrice)
    if (isNaN(priceNum) || priceNum <= 0) { setError('Please enter a valid price'); return }

    const { error: updateError } = await supabase
      .from('items')
      .update({ name: editName.trim(), price: priceNum })
      .eq('id', id)

    if (updateError) { setError('Could not update: ' + updateError.message); return }

    setItems(items.map(i =>
      i.id === id ? { ...i, name: editName.trim(), price: priceNum } : i
    ))
    setEditingId(null)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditName('')
    setEditPrice('')
    setError('')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item? This cannot be undone.')) return

    const { error: deleteError } = await supabase
      .from('items')
      .delete()
      .eq('id', id)

    if (deleteError) { setError('Could not delete: ' + deleteError.message); return }

    setItems(items.filter(i => i.id !== id))
  }

  const filteredItems = items.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Logo size={64} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-28">

      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Back to dashboard">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <p className="text-xs text-gray-500 font-medium">Menu</p>
              <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-tight">Items</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900 leading-tight">{business?.business_name}</p>
              <p className="text-xs text-gray-400">+91 {phone}</p>
            </div>
            <div className="w-10 h-10 bg-[#635BFF] text-white rounded-full flex items-center justify-center font-bold shadow-md">
              {business?.business_name?.charAt(0).toUpperCase() || 'O'}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6">

        <div className="mb-6">
          <div className="bg-gradient-to-br from-[#F4F3FF] via-white to-[#EFEEFF] rounded-3xl p-6 border border-[#EFEEFF] shadow-sm">
            <p className="text-xs sm:text-sm text-gray-500 font-semibold mb-2 uppercase tracking-wider">
              Your menu
            </p>
            <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2 leading-tight">
              {items.length} {items.length === 1 ? 'item' : 'items'} saved
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Save items once. Tap to add to any invoice. <strong className="text-gray-900">10-second billing.</strong>
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {showAddForm ? (
          <div className="mb-6 bg-white rounded-2xl border-2 border-[#635BFF] shadow-md overflow-hidden">
            <form onSubmit={handleAddItem} className="p-5 space-y-4">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-lg font-bold text-gray-900">Add new item</h2>
                <button
                  type="button"
                  onClick={() => { setShowAddForm(false); setNewName(''); setNewPrice(''); setError('') }}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Item name
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Lunch tiffin"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-[#635BFF] text-base"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="100"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-[#635BFF] text-base"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowAddForm(false); setNewName(''); setNewPrice(''); setError('') }}
                  className="flex-1 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#635BFF] hover:bg-[#4D44E0] text-white py-3 rounded-xl font-bold text-sm transition-colors shadow-md"
                >
                  Save item
                </button>
              </div>
            </form>
          </div>
        ) : (
          items.length > 3 && (
            <div className="mb-4">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search items..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-[#635BFF] text-sm"
                />
              </div>
            </div>
          )
        )}

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10 text-center">
            <p className="text-5xl mb-4">📝</p>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No items yet</h3>
            <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto">
              Save your popular items like &quot;Lunch tiffin&quot; or &quot;Cold coffee&quot;. Then tap them to add to invoices in seconds.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 bg-[#635BFF] hover:bg-[#4D44E0] text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-md"
            >
              + Add your first item
            </button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
            <p className="text-3xl mb-3">🔍</p>
            <p className="text-sm text-gray-600">No items match &quot;{search}&quot;</p>
            <button
              onClick={() => setSearch('')}
              className="mt-3 text-sm text-[#635BFF] font-bold hover:text-[#4D44E0]"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-100">
            {filteredItems.map((item) => (
              <div key={item.id} className="p-4 sm:p-5">
                {editingId === item.id ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-[#635BFF] text-sm font-semibold"
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Price (₹)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-[#635BFF] text-sm font-bold"
                      />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={handleCancelEdit}
                        className="flex-1 bg-white border border-gray-200 text-gray-700 py-2 rounded-lg font-bold text-xs hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex-1 bg-white border border-red-200 text-red-600 py-2 rounded-lg font-bold text-xs hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleSaveEdit(item.id)}
                        className="flex-1 bg-[#635BFF] hover:bg-[#4D44E0] text-white py-2 rounded-lg font-bold text-xs transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleStartEdit(item)}
                    className="w-full flex items-center gap-3 text-left hover:bg-gray-50 -mx-4 sm:-mx-5 px-4 sm:px-5 py-1 rounded transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#EFEEFF] text-[#635BFF] rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 truncate text-sm sm:text-base">{item.name}</p>
                      <p className="text-xs text-gray-400">Tap to edit</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-extrabold text-gray-900 text-base sm:text-lg">₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && !showAddForm && (
          <p className="text-center text-xs text-gray-500 mt-6">
            {items.length} {items.length === 1 ? 'item' : 'items'} · Tap any item to edit or delete
          </p>
        )}

      </main>

      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="fixed bottom-6 right-6 w-14 h-14 sm:w-16 sm:h-16 bg-[#635BFF] text-white rounded-2xl shadow-2xl shadow-[#635BFF]/40 hover:bg-[#4D44E0] transition-colors flex items-center justify-center text-3xl font-light z-20"
          aria-label="Add new item"
        >
          +
        </button>
      )}

    </div>
  )
}
