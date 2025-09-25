import React from 'react'
import { useTacheContext } from '../../context/TacheContext'
import {CheckCheck, Loader, WalletCards} from "lucide-react"

export default function Stats() {
    const {total, totalTermine, totalEnCours} = useTacheContext()
  return (
    <div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm font-medium">Total</p>
                        <p class="text-2xl font-bold text-gray-800" id="total-tasks">{total}</p>
                    </div>
                    <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        <WalletCards />
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm font-medium">Terminées</p>
                        <p class="text-2xl font-bold text-green-600" id="completed-tasks">{totalTermine}</p>
                    </div>
                    <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        <CheckCheck />
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm font-medium">En cours</p>
                        <p class="text-2xl font-bold text-orange-600" id="pending-tasks">{totalEnCours}</p>
                    </div>
                    <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                       <Loader />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
