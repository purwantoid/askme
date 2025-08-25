import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import * as React from "react"
import {Globe, User, Briefcase, Smartphone, Code, Palette, Mic, ArrowUp, Search, TrendingUp, MapPin, Clock} from "lucide-react"
import {useState, useEffect} from "react"
import {cn} from "@/lib/utils"
import {Textarea} from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"

const searchCategories = [
    {name: "Electronics", icon: Smartphone, examples: ["iPhone 15", "Samsung TV", "Gaming laptop"]},
    {name: "Fashion", icon: Palette, examples: ["Nike shoes", "Designer jeans", "Summer dress"]},
    {name: "Home & Garden", icon: User, examples: ["Sofa bed", "Kitchen appliances", "Garden tools"]},
    {name: "Automotive", icon: Code, examples: ["Car parts", "Motorcycle helmet", "Tire prices"]},
    {name: "Food & Grocery", icon: Globe, examples: ["Organic vegetables", "Restaurant menu", "Coffee beans"]},
    {name: "Services", icon: Briefcase, examples: ["Plumber rates", "Hair salon prices", "Delivery fees"]},
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
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {

    const [prompt, setPrompt] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [isVoiceRecording, setIsVoiceRecording] = useState(false)
    const [searchHistory, setSearchHistory] = useState<string[]>(["iPhone 15 price", "Coffee shops nearby"])
    const [showHistory, setShowHistory] = useState(false)
    const [gradientVariant, setGradientVariant] = useState<'lovable' | 'aurora' | 'cosmic'>('lovable')
    const [focusMode, setFocusMode] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!prompt.trim()) return

        setIsLoading(true)

        try {
            // For now, simulate a search by redirecting with query params
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
        // Voice recognition would be implemented here
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            // Implementation would go here
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

    // Auto-focus on input and show suggestions
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
            <div className={cn(
                "min-h-screen px-4 sm:px-8 lg:px-12 xl:px-24 2xl:px-48 transition-all duration-1000",
                gradientVariant === 'lovable' && 'bg-lovable-gradient',
                gradientVariant === 'aurora' && 'bg-aurora',
                gradientVariant === 'cosmic' && 'bg-cosmic'
            )}>
                <header className="relative z-10 flex items-center justify-between p-4 sm:p-6">
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white dark:bg-white/10 border border-transparent dark:border-white/20">
                            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-primary dark:text-white"/>
                        </div>
                        <span className="text-lg sm:text-xl font-bold text-white">Askme</span>
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
                    <nav className="flex items-center justify-end gap-2 sm:gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-lg border border-white/20 px-3 sm:px-5 py-1.5 text-sm leading-normal text-white hover:bg-white/10 transition-smooth"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg border border-transparent px-3 sm:px-5 py-1.5 text-sm leading-normal text-white hover:bg-white/10 transition-smooth"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg border border-white/20 px-3 sm:px-5 py-1.5 text-sm leading-normal text-white hover:bg-white/10 transition-smooth"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <div className="flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-24 lg:py-32 min-h-[calc(100vh-120px)]">
                    <div className="text-center max-w-4xl mx-auto w-full">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 animate-fade-in">
                            Find Local Prices{" "}
                            <span className="bg-white text-transparent bg-clip-text">Instantly</span>
                        </h1>
                        <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-8 sm:mb-12 animate-fade-in max-w-2xl mx-auto px-4" style={{animationDelay: '0.2s'}}>
                            Search products, services, and compare prices from local businesses near you
                        </p>

                        {/* Main Input */}
                        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto animate-scale-in relative" style={{animationDelay: '0.4s'}}>
                            <div className="relative">
                                <div className="bg-black/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 shadow-elegant overflow-hidden transition-smooth hover:bg-black/50">
                                    <div className="flex items-center px-4 sm:px-6 py-3 sm:py-4">
                                        <div className="flex-1 relative">
                                            <Textarea
                                                value={prompt}
                                                onChange={(e) => setPrompt(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                placeholder="Search for prices... (e.g., iPhone 15 Pro, coffee shops, plumber rates)"
                                                disabled={isLoading}
                                                className="flex-1 min-h-[24px] sm:min-h-[28px] max-h-32 resize-none bg-transparent text-white placeholder:text-white/60 text-sm sm:text-base border-0 border-transparent outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none p-0"
                                                rows={3}
                                            />
                                            {isLoading && (
                                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between px-4 sm:px-6 pb-3 sm:pb-4">
                                        <div className="flex items-center space-x-2">
                                            <div className="hidden sm:flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1.5">
                                                <MapPin className="h-3 w-3 text-white/70"/>
                                                <span className="text-xs text-white/70">Near me</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Button
                                                type="button"
                                                onClick={handleVoiceInput}
                                                variant="ghost"
                                                size="sm"
                                                className={cn(
                                                    "h-8 w-8 rounded-full transition-smooth p-0",
                                                    isVoiceRecording 
                                                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" 
                                                        : "bg-white/10 text-white/70 hover:text-white hover:bg-white/20"
                                                )}
                                            >
                                                <Mic className={cn("h-4 w-4", isVoiceRecording && "animate-pulse")}/>
                                            </Button>

                                            <Button
                                                type="submit"
                                                disabled={!prompt.trim() || isLoading}
                                                className={cn(
                                                    "h-8 w-8 rounded-full transition-spring p-0",
                                                    prompt.trim() && !isLoading
                                                        ? "bg-white text-black hover:bg-white/90 hover:scale-105"
                                                        : "bg-white/40 text-white/60 cursor-not-allowed"
                                                )}
                                                size="icon"
                                            >
                                                {isLoading ? (
                                                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                                                ) : (
                                                    <ArrowUp className="h-4 w-4"/>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Suggestions Dropdown */}
                                {showSuggestions && selectedCategory && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-4 z-10 animate-fade-in">
                                        <h4 className="text-white text-sm font-medium mb-3">Popular {selectedCategory} searches:</h4>
                                        <div className="space-y-2">
                                            {searchCategories.find(cat => cat.name === selectedCategory)?.examples.map((example, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleExampleClick(example)}
                                                    className="block w-full text-left text-white/80 hover:text-white text-sm py-2 px-3 rounded-lg hover:bg-white/10 transition-smooth"
                                                >
                                                    {example}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>

                        {/* Trending Searches */}
                        <div className="mt-8 sm:mt-12 animate-fade-in" style={{animationDelay: '0.6s'}}>
                            <div className="flex items-center justify-center mb-4">
                                <TrendingUp className="h-4 w-4 text-white/60 mr-2"/>
                                <span className="text-white/60 text-sm">Trending searches</span>
                            </div>
                            <div className="flex flex-wrap justify-center gap-2">
                                {trendingSearches.map((search, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleTrendingClick(search)}
                                        className="px-3 py-1.5 text-xs sm:text-sm text-white/70 bg-white/10 rounded-full hover:bg-white/20 hover:text-white transition-smooth border border-white/10"
                                    >
                                        {search}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="px-4 sm:px-6 py-8 sm:py-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Browse by Category</h2>
                            <p className="text-white/60 text-sm">Find what you're looking for faster</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                            {searchCategories.map((category) => (
                                <button
                                    key={category.name}
                                    onClick={() => handleCategoryClick(category)}
                                    className="group flex flex-col items-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm text-white hover:bg-white/10 rounded-xl sm:rounded-2xl border border-white/10 hover:border-white/20 transition-smooth"
                                >
                                    <category.icon className="h-6 w-6 sm:h-8 sm:w-8 mb-2 sm:mb-3 text-white/70 group-hover:text-white transition-smooth"/>
                                    <span className="text-xs sm:text-sm font-medium text-center">{category.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="px-4 sm:px-6 py-8 sm:py-12 bg-black/20">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8 sm:mb-12">
                            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Why Choose Askme?</h2>
                            <p className="text-white/60 text-sm">Get the best deals in your area</p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MapPin className="h-6 w-6 text-white/70"/>
                                </div>
                                <h3 className="text-white font-medium mb-2">Local Results</h3>
                                <p className="text-white/60 text-sm">Find prices from businesses near you</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Clock className="h-6 w-6 text-white/70"/>
                                </div>
                                <h3 className="text-white font-medium mb-2">Real-time Updates</h3>
                                <p className="text-white/60 text-sm">Get current prices and availability</p>
                            </div>
                            <div className="text-center sm:col-span-2 lg:col-span-1">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="h-6 w-6 text-white/70"/>
                                </div>
                                <h3 className="text-white font-medium mb-2">Best Deals</h3>
                                <p className="text-white/60 text-sm">Compare prices and save money</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
