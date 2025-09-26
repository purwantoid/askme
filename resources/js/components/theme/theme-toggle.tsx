'use client';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/theme-context';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ThemeToggle = ({ className }: { className?: string }) => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button size={'icon'} variant={'ghost'} className={cn('rounded-xl', className)}>
                <Moon />
            </Button>
        );
    }

    return (
        <Button onClick={toggleTheme} size={'icon'} variant={'ghost'} className={cn('rounded-xl', className)}>
            {theme === 'light' ? <Sun /> : <Moon />}
        </Button>
    );
};
