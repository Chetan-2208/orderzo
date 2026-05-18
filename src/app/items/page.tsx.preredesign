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
}

interface Business {
  id: string
  business_name: string
}

export default function ItemsPage() {
  const [business, setBusiness] = useState<Business | null>(null)
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editPrice, setEditPrice] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const savedPhone = localStorage.getItem('orderzo_user_phone')
    if (!savedPhone) {
      router.push('/login')
      return
    }

    loadBusinessAndItems(savedPhone)
  }, [router])

  const loadBusinessAndItems = async (phone: string) => {
    // Load business
    const { data: businessData, error: businessError } = await supabase
      .from('businesses')
      .select('*')
      .eq('owner_phone', phone)
      .single()

    if (businessError || !businessData) {
      router.push('/setup')
      return
    }

    setBusiness(businessData)

    // Load items
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

    if (!newName.trim()) {
      setError('Please enter item name')
      return
    }

    const priceNum = parseFloat(newPrice)
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Please enter a valid price')
      return
    }

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

    if (insertError) {
      setError('Could not add item: ' + insertError.message)
      return
    }

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

    if (!editName.trim()) {
      setError('Item name cannot be empty')
      return
    }

    const priceNum = parseFloat(editPrice)
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Please enter a valid price')
      return
    }

    const { error: updateError } = await supabase
      .from('items')
      .update({ name: editName.trim(), price: priceNum })
      .eq('id', id)

    if (updateError) {
      setError('Could not update: ' + updateError.message)
      return
    }

    setItems(items.map(i => 
      i.id === id ? { ...i, name: editName.trim(), price: priceNum } : i
    ))
    setEditingId(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return

    const { error: deleteError } = await supabase
      .from('items')
      .delete()
      .eq('id', id)

    if (deleteError) {
      setError('Could not delete: ' + deleteError.message)
      return
    }

    setItems(items.filter(i => i.id !== id))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F3FF] flex items-center justify-center">
        <Logo size={64} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
            ←
          </Link>
          <div className="flex-1">
            <h1 className="font-bold text-gray-900">Menu / Items</h1>
            <p className="text-xs text-gray-500">{business?.business_name}</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm mb-4">
            {error}
          </div>
        )}

        {/* Add new item form */}
        {showAddForm ? (
          <div className="bg-white rounded-2xl p-5 border-2 border-[#BDB9FF] shadow-lg shadow-blue-600/10 mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">Add new item</h3>
            <form onSubmit={handleAddItem} className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Item name</label>
                <input
                  type="text"
                  placeholder="e.g., Tiffin, Cotton Shirt"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#EFEEFF]"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Price (₹)</label>
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="0"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#EFEEFF]"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#635BFF] text-white py-2.5 rounded-xl font-medium hover:bg-[#4D44E0] transition-colors"
                >
                  Add Item
                </button>
                <button
                  type="button"
                  onClick={() => { setShowAddForm(false); setNewName(''); setNewPrice(''); setError('') }}
                  className="px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full bg-[#635BFF] text-white py-3 rounded-xl font-medium shadow-lg shadow-[#635BFF]/30 hover:bg-[#4D44E0] transition-colors mb-4"
          >
            + Add new item
          </button>
        )}

        {/* Items list */}
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-200">
            <div className="text-5xl mb-3">📋</div>
            <h3 className="font-semibold text-gray-900 mb-1">No items yet</h3>
            <p className="text-sm text-gray-500">Tap "Add new item" to start building your menu</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs text-gray-500 px-2 mb-2">{items.length} item{items.length !== 1 ? 's' : ''}</p>
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                {editingId === item.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#635BFF]"
                    />
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#635BFF]"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveEdit(item.id)}
                        className="flex-1 bg-[#635BFF] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#4D44E0]"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => { setEditingId(null); setError('') }}
                        className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-[#635BFF] font-semibold">₹{item.price}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="text-sm text-gray-500 hover:text-[#635BFF] px-3 py-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-sm text-gray-500 hover:text-red-500 px-3 py-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-400 text-center mt-6">
          💡 Items appear when creating orders or bills
        </p>
      </main>
    </div>
  );
}
