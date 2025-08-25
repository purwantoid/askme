import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import * as React from "react"
import PrimaryButton from '@/components/PrimaryButton';
import {Plus, Globe, User, Briefcase, Smartphone, Code, Palette, Mic, ArrowUp} from "lucide-react"
import {useState} from "react"
import {cn} from "@/lib/utils"
import {Textarea} from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"

const projectCategories = [
    {name: "Internal Tools", icon: Briefcase},
    {name: "Website", icon: Globe},
    {name: "Personal", icon: User},
    {name: "Consumer App", icon: Smartphone},
    {name: "B2B App", icon: Briefcase},
    {name: "Prototype", icon: Code},
]

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {

    const [prompt, setPrompt] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!prompt.trim()) return

        setIsLoading(true)

        // Navigate to chat with the initial prompt
        // navigate("/chat", {state: {initialPrompt: prompt.trim()}})
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        }
    }
    return (
        <>
            <Head title="Askme" />
            <div className="min-h-screen bg-lovable-gradient px-48">
                <header className="relative z-10 flex items-center justify-between p-6">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <Palette className="h-5 w-5 text-primary"/>
                        </div>
                        <span className="text-xl font-bold text-white">Thinklive.id</span>
                        <Button variant="ghost" className="text-white hover:bg-white/10">
                            Community
                        </Button>
                        <Button variant="ghost" className="text-white hover:bg-white/10">
                            Pricing
                        </Button>
                        <Button variant="ghost" className="text-white hover:bg-white/10">
                            Learn
                        </Button>
                    </div>
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <div className="flex flex-col items-center justify-center px-6 py-60">
                    <div className="text-center max-w-6xl mx-auto">
                        <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in">
                            Ask Local Prices{" "}
                            <span className="bg-white text-transparent bg-clip-text">Instantly</span>
                        </h1>
                        <p className="text-xl text-white/80 mb-12 animate-fade-in" style={{animationDelay: '0.2s'}}>
                            Type any question, get real-time product prices based on your location
                        </p>

                        {/* Main Input */}
                        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto animate-scale-in" style={{animationDelay: '0.4s'}}>
                            <div className="relative">
                                <div className="bg-black backdrop-blur-xl rounded-3xl border border-white/10 shadow-elegant overflow-hidden transition-smooth hover:bg-black">
                                    <div className="flex items-center px-6 py-4">
                                        <Textarea
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Ask thinklive to search the best product price for you..."
                                            disabled={isLoading}
                                            className="flex-1 min-h-[20px] max-h-32 resize-none bg-transparent text-white placeholder:text-white/80 text-base border border-black outline-none focus:outline-none focus-visible:outline-none
    focus:border-black focus-visible:border-black ring-0 focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 shadow-none focus:shadow-none focus-visible:shadow-none"
                                            rows={2}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between px-6 pb-4">
                                        <div className="flex items-center space-x-3">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-smooth p-0"
                                            >
                                                <Plus className="h-4 w-4"/>
                                            </Button>

                                            {/*<div className="flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1.5">*/}
                                            {/*    <Globe className="h-3 w-3 text-white/70"/>*/}
                                            {/*    <span className="text-sm text-white/70">Public</span>*/}
                                            {/*</div>*/}

                                            {/*<div className="flex items-center space-x-2 bg-emerald-500/20 rounded-full px-3 py-1.5">*/}
                                            {/*    <Database className="h-3 w-3 text-emerald-400"/>*/}
                                            {/*    <span className="text-sm text-emerald-400">Supabase</span>*/}
                                            {/*    <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>*/}
                                            {/*</div>*/}
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-smooth p-0"
                                            >
                                                <Mic className="h-4 w-4"/>
                                            </Button>

                                            <Button
                                                type="submit"
                                                disabled={!prompt.trim() || isLoading}
                                                className={cn(
                                                    "h-8 w-8 rounded-full transition-spring p-0",
                                                    prompt.trim() && !isLoading
                                                        ? "bg-white/80 text-black hover:bg-white/90 hover:scale-105"
                                                        : "bg-white/80 text-black cursor-not-allowed"
                                                )}
                                                size="icon"
                                            >
                                                <ArrowUp className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Categories */}
                <div className="px-6 py-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            {projectCategories.map((category) => (
                                <Button
                                    key={category.name}
                                    variant="ghost"
                                    className="bg-black/90 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-smooth"
                                >
                                    <category.icon className="h-4 w-4 mr-2"/>
                                    {category.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
