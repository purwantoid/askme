import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import * as React from "react"
import {
    Globe, User, Briefcase, Smartphone, Code, Palette,
    Mic, ArrowUp, Search, TrendingUp, MapPin, Clock
} from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const searchCategories = [
    { name: "Electronics", icon: Smartphone, examples: ["iPhone 15", "Samsung TV", "Gaming laptop"] },
    { name: "Fashion", icon: Palette, examples: ["Nike shoes", "Designer jeans", "Summer dress"] },
    { name: "Home & Garden", icon: User, examples: ["Sofa bed", "Kitchen appliances", "Garden tools"] },
    { name: "Automotive", icon: Code, examples: ["Car parts", "Motorcycle helmet", "Tire prices"] },
    { name: "Food & Grocery", icon: Globe, examples: ["Organic vegetables", "Restaurant menu", "Coffee beans"] },
    { name: "Services", icon: Briefcase, examples: ["Plumber rates", "Hair salon prices", "Delivery fees"] },
]

const trendingSearches = [
    "iPhone 15 Pro Max price",
    "Best coffee shops nearby",
    "Grocery delivery rates",
    "Car repair services",
    "Electronics store discounts"
]

export default function Welcome({
                                    auth,
                                }: PageProps<{ laravelVersion: string; phpVersion: string }>) {

    const [prompt, setPrompt] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [isVoiceRecording, setIsVoiceRecording] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!prompt.trim()) return

        setIsLoading(true)
        try {
            const searchQuery = encodeURIComponent(prompt.trim())
            router.visit(`/search?q=${searchQuery}`, {
                method: 'get',
                onFinish: () => setIsLoading(false)
            })
        } catch (error) {
            console.error('Search failed:', error)
            setIsLoading(false)
        }
    }

    const handleCategoryClick = (category: typeof searchCategories[0]) => {
        setSelectedCategory(category.name)
        setPrompt(`Search ${category.name.toLowerCase()} prices near me`)
        setShowSuggestions(true)
    }

    const handleExampleClick = (example: string) => {
        setPrompt(`Find ${example} prices near me`)
        setShowSuggestions(false)
    }

    const handleTrendingClick = (search: string) => {
        setPrompt(search)
        setShowSuggestions(false)
    }

    const handleVoiceInput = () => {
        setIsVoiceRecording(!isVoiceRecording)
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            console.log('Voice recognition not implemented yet')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        }
        if (e.key === "Escape") {
            setShowSuggestions(false)
            setSelectedCategory(null)
        }
    }

    useEffect(() => {
        if (prompt.length > 2) {
            setShowSuggestions(true)
        } else {
            setShowSuggestions(false)
            setSelectedCategory(null)
        }
    }, [prompt])

    return (
        <>
            <Head title="Askme" />
            <div className="min-h-screen px-4 sm:px-8 lg:px-12 xl:px-24 2xl:px-48 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 transition-all duration-1000 text-white">

                {/* Header */}
                <header className="relative z-10 flex items-center justify-between px-6 py-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/10 border border-white/20">
                            <Search className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold">Askme</span>
                        <div className="hidden md:flex items-center space-x-1">
                            <Button variant="ghost" className="text-white hover:bg-white/10 text-sm">
                                Community
                            </Button>
                            <Button variant="ghost" className="text-white hover:bg-white/10 text-sm">
                                Pricing
                            </Button>
                            <Button variant="ghost" className="text-white hover:bg-white/10 text-sm">
                                Learn
                            </Button>
                        </div>
                    </div>
                    <nav className="flex items-center gap-3">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-lg border border-white/20 px-5 py-1.5 text-sm text-white hover:bg-white/10 transition-all"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-lg px-5 py-1.5 text-sm text-white hover:bg-white/10 transition-all"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-lg border border-white/20 px-5 py-1.5 text-sm text-white hover:bg-white/10 transition-all"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <div className="flex flex-col items-center justify-center px-4 py-20 min-h-[calc(100vh-140px)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-indigo-500/20 to-purple-500/20 blur-3xl opacity-40" />
                    <div className="text-center max-w-4xl mx-auto relative z-10">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 animate-fade-in">
                            Find Local Prices{" "}
                            <span className="bg-gradient-to-r from-pink-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Instantly
              </span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 mb-12 animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
                            Search products, services, and compare prices from local businesses near you
                        </p>

                        {/* Search Box */}
                        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto animate-scale-in relative" style={{ animationDelay: '0.4s' }}>
                            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl transition hover:bg-white/15">
                                <div className="flex items-center px-6 py-4">
                                    <Textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Search for prices... (e.g., iPhone 15 Pro, coffee shops, plumber rates)"
                                        disabled={isLoading}
                                        className="flex-1 min-h-[32px] resize-none bg-transparent text-white placeholder:text-white/60 text-base border-0 focus:border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                                        rows={2}
                                    />
                                    {isLoading && (
                                        <div className="ml-3 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    )}
                                </div>
                                <div className="flex items-center justify-between px-6 pb-4">
                                    <div className="flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1.5">
                                        <MapPin className="h-4 w-4 text-white/70" />
                                        <span className="text-xs text-white/70">Near me</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            type="button"
                                            onClick={handleVoiceInput}
                                            variant="ghost"
                                            size="sm"
                                            className={cn(
                                                "h-9 w-9 rounded-full transition-all",
                                                isVoiceRecording
                                                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                                    : "bg-white/10 text-white/70 hover:text-white hover:bg-white/20"
                                            )}
                                        >
                                            <Mic className={cn("h-4 w-4", isVoiceRecording && "animate-pulse")} />
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={!prompt.trim() || isLoading}
                                            className={cn(
                                                "h-9 w-9 rounded-full transition transform",
                                                prompt.trim() && !isLoading
                                                    ? "bg-gradient-to-r from-pink-400 to-indigo-500 text-white hover:scale-105 shadow-lg"
                                                    : "bg-white/20 text-white/50 cursor-not-allowed"
                                            )}
                                            size="icon"
                                        >
                                            {isLoading ? (
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <ArrowUp className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>

                        {/* Trending */}
                        <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                            <div className="flex items-center justify-center mb-4">
                                <TrendingUp className="h-4 w-4 text-white/60 mr-2" />
                                <span className="text-white/60 text-sm">Trending searches</span>
                            </div>
                            <div className="flex flex-wrap justify-center gap-3">
                                {trendingSearches.map((search, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleTrendingClick(search)}
                                        className="px-4 py-2 text-sm text-white/80 bg-white/10 rounded-full hover:bg-white/20 hover:text-white transition transform hover:scale-105 shadow-md"
                                    >
                                        {search}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="px-4 py-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl opacity-40" />
                    <div className="max-w-6xl mx-auto relative z-10">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
                                Browse by Category
                            </h2>
                            <p className="text-white/70 text-base">Find what you're looking for faster</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                            {searchCategories.map((category) => (
                                <button
                                    key={category.name}
                                    onClick={() => handleCategoryClick(category)}
                                    className="group relative flex flex-col items-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-md hover:shadow-xl hover:scale-105 transition-all"
                                >
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-pink-500/20 via-indigo-500/20 to-purple-500/20 blur-xl" />
                                    <category.icon className="relative z-10 h-9 w-9 mb-3 text-white/80 group-hover:text-white transition" />
                                    <span className="relative z-10 text-sm font-medium text-white/90 group-hover:text-white">{category.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="px-4 py-16 bg-white/5 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-indigo-600/10 to-purple-600/10 blur-3xl opacity-40" />
                    <div className="max-w-5xl mx-auto relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-3">
                                Why Choose Askme?
                            </h2>
                            <p className="text-white/70 text-base">Get the best deals in your area</p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md hover:shadow-xl hover:scale-105 transition text-center">
                                <div className="w-14 h-14 bg-gradient-to-r from-pink-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MapPin className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Local Results</h3>
                                <p className="text-white/70 text-sm">Find prices from businesses near you</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md hover:shadow-xl hover:scale-105 transition text-center">
                                <div className="w-14 h-14 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Clock className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
                                <p className="text-white/70 text-sm">Get current prices and availability</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md hover:shadow-xl hover:scale-105 transition text-center">
                                <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Best Deals</h3>
                                <p className="text-white/70 text-sm">Compare prices and save money</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}