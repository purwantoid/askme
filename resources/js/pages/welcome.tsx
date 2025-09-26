import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowUp, Briefcase, Clock, Code, Globe, MapPin, Mic, Palette, Search, Smartphone, TrendingUp, User } from 'lucide-react';
import * as React from 'react';
import { useEffect, useState } from 'react';

const searchCategories = [
    { name: 'Electronics', icon: Smartphone, examples: ['iPhone 15', 'Samsung TV', 'Gaming laptop'] },
    { name: 'Fashion', icon: Palette, examples: ['Nike shoes', 'Designer jeans', 'Summer dress'] },
    { name: 'Home & Garden', icon: User, examples: ['Sofa bed', 'Kitchen appliances', 'Garden tools'] },
    { name: 'Automotive', icon: Code, examples: ['Car parts', 'Motorcycle helmet', 'Tire prices'] },
    { name: 'Food & Grocery', icon: Globe, examples: ['Organic vegetables', 'Restaurant menu', 'Coffee beans'] },
    { name: 'Services', icon: Briefcase, examples: ['Plumber rates', 'Hair salon prices', 'Delivery fees'] },
];

const trendingSearches = [
    'iPhone 15 Pro Max price',
    'Best coffee shops nearby',
    'Grocery delivery rates',
    'Car repair services',
    'Electronics store discounts',
];

export default function Welcome({ auth }: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isVoiceRecording, setIsVoiceRecording] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsLoading(true);
        try {
            const searchQuery = encodeURIComponent(prompt.trim());
            router.visit(`/search?q=${searchQuery}`, {
                method: 'get',
                onFinish: () => setIsLoading(false),
            });
        } catch (error) {
            console.error('Search failed:', error);
            setIsLoading(false);
        }
    };

    const handleCategoryClick = (category: (typeof searchCategories)[0]) => {
        setSelectedCategory(category.name);
        setPrompt(`Search ${category.name.toLowerCase()} prices near me`);
        setShowSuggestions(true);
    };

    const handleExampleClick = (example: string) => {
        setPrompt(`Find ${example} prices near me`);
        setShowSuggestions(false);
    };

    const handleTrendingClick = (search: string) => {
        setPrompt(search);
        setShowSuggestions(false);
    };

    const handleVoiceInput = () => {
        setIsVoiceRecording(!isVoiceRecording);
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            console.log('Voice recognition not implemented yet');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
        if (e.key === 'Escape') {
            setShowSuggestions(false);
            setSelectedCategory(null);
        }
    };

    useEffect(() => {
        if (prompt.length > 2) {
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
            setSelectedCategory(null);
        }
    }, [prompt]);

    return (
        <>
            <Head title="Askme" />
            <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 px-4 text-white transition-all duration-1000 sm:px-8 lg:px-12 xl:px-24 2xl:px-48">
                {/* Header */}
                <header className="relative z-10 flex items-center justify-between px-6 py-6">
                    <div className="flex items-center space-x-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10">
                            <Search className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold">Askme</span>
                        <div className="hidden items-center space-x-1 md:flex">
                            <Button variant="ghost" className="text-sm text-white hover:bg-white/10">
                                Community
                            </Button>
                            <Button variant="ghost" className="text-sm text-white hover:bg-white/10">
                                Pricing
                            </Button>
                            <Button variant="ghost" className="text-sm text-white hover:bg-white/10">
                                Learn
                            </Button>
                        </div>
                    </div>
                    <nav className="flex items-center gap-3">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-lg border border-white/20 px-5 py-1.5 text-sm text-white transition-all hover:bg-white/10"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="rounded-lg px-5 py-1.5 text-sm text-white transition-all hover:bg-white/10">
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-lg border border-white/20 px-5 py-1.5 text-sm text-white transition-all hover:bg-white/10"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <div className="relative flex min-h-[calc(100vh-140px)] flex-col items-center justify-center overflow-hidden px-4 py-20">
                    <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-indigo-500/20 to-purple-500/20 opacity-40 blur-3xl" />
                    <div className="relative z-10 mx-auto max-w-4xl text-center">
                        <h1 className="animate-fade-in mb-6 text-5xl font-extrabold md:text-6xl lg:text-7xl">
                            Find Local Prices{' '}
                            <span className="bg-gradient-to-r from-pink-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                Instantly
                            </span>
                        </h1>
                        <p className="animate-fade-in mx-auto mb-12 max-w-2xl text-lg text-white/80 md:text-xl" style={{ animationDelay: '0.2s' }}>
                            Search products, services, and compare prices from local businesses near you
                        </p>

                        {/* Search Box */}
                        <form onSubmit={handleSubmit} className="animate-scale-in relative mx-auto max-w-3xl" style={{ animationDelay: '0.4s' }}>
                            <div className="rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl transition hover:bg-white/15">
                                <div className="flex items-center px-6 py-4">
                                    <Textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Search for prices... (e.g., iPhone 15 Pro, coffee shops, plumber rates)"
                                        disabled={isLoading}
                                        className="min-h-[32px] flex-1 resize-none border-0 bg-transparent p-0 text-base text-white placeholder:text-white/60 focus:border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        rows={2}
                                    />
                                    {isLoading && <div className="ml-3 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
                                </div>
                                <div className="flex items-center justify-between px-6 pb-4">
                                    <div className="flex items-center space-x-2 rounded-full bg-white/10 px-3 py-1.5">
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
                                                'h-9 w-9 rounded-full transition-all',
                                                isVoiceRecording
                                                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                                            )}
                                        >
                                            <Mic className={cn('h-4 w-4', isVoiceRecording && 'animate-pulse')} />
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={!prompt.trim() || isLoading}
                                            className={cn(
                                                'h-9 w-9 transform rounded-full transition',
                                                prompt.trim() && !isLoading
                                                    ? 'bg-gradient-to-r from-pink-400 to-indigo-500 text-white shadow-lg hover:scale-105'
                                                    : 'cursor-not-allowed bg-white/20 text-white/50'
                                            )}
                                            size="icon"
                                        >
                                            {isLoading ? (
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            ) : (
                                                <ArrowUp className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>

                        {/* Trending */}
                        <div className="animate-fade-in mt-12" style={{ animationDelay: '0.6s' }}>
                            <div className="mb-4 flex items-center justify-center">
                                <TrendingUp className="mr-2 h-4 w-4 text-white/60" />
                                <span className="text-sm text-white/60">Trending searches</span>
                            </div>
                            <div className="flex flex-wrap justify-center gap-3">
                                {trendingSearches.map((search, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleTrendingClick(search)}
                                        className="transform rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 shadow-md transition hover:scale-105 hover:bg-white/20 hover:text-white"
                                    >
                                        {search}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="relative overflow-hidden px-4 py-16">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-40 blur-3xl" />
                    <div className="relative z-10 mx-auto max-w-6xl">
                        <div className="mb-10 text-center">
                            <h2 className="mb-3 bg-gradient-to-r from-pink-400 via-indigo-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent">
                                Browse by Category
                            </h2>
                            <p className="text-base text-white/70">Find what you're looking for faster</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
                            {searchCategories.map((category) => (
                                <button
                                    key={category.name}
                                    onClick={() => handleCategoryClick(category)}
                                    className="group relative flex flex-col items-center rounded-2xl border border-white/20 bg-white/10 p-6 shadow-md backdrop-blur-md transition-all hover:scale-105 hover:shadow-xl"
                                >
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/20 via-indigo-500/20 to-purple-500/20 opacity-0 blur-xl transition group-hover:opacity-100" />
                                    <category.icon className="relative z-10 mb-3 h-9 w-9 text-white/80 transition group-hover:text-white" />
                                    <span className="relative z-10 text-sm font-medium text-white/90 group-hover:text-white">{category.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="relative overflow-hidden bg-white/5 px-4 py-16 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-indigo-600/10 to-purple-600/10 opacity-40 blur-3xl" />
                    <div className="relative z-10 mx-auto max-w-5xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-3 bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent">
                                Why Choose Askme?
                            </h2>
                            <p className="text-base text-white/70">Get the best deals in your area</p>
                        </div>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 text-center shadow-md backdrop-blur-md transition hover:scale-105 hover:shadow-xl">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-indigo-500">
                                    <MapPin className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">Local Results</h3>
                                <p className="text-sm text-white/70">Find prices from businesses near you</p>
                            </div>
                            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 text-center shadow-md backdrop-blur-md transition hover:scale-105 hover:shadow-xl">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-indigo-400 to-purple-500">
                                    <Clock className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">Real-time Updates</h3>
                                <p className="text-sm text-white/70">Get current prices and availability</p>
                            </div>
                            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 text-center shadow-md backdrop-blur-md transition hover:scale-105 hover:shadow-xl">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-pink-500">
                                    <TrendingUp className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">Best Deals</h3>
                                <p className="text-sm text-white/70">Compare prices and save money</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
