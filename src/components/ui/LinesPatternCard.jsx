import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function LinesPatternCard({
    children,
    className,
    patternClassName,
    gradientClassName,
    ...props
}) {
    return (
        <motion.div
            className={cn(
                'relative border w-full rounded-[2rem] overflow-hidden',
                className
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            {...props}
        >
            {/* Pattern layer — absolute, covers entire card */}
            <div
                className={cn(
                    'absolute inset-0 bg-repeat bg-[length:30px_30px]',
                    patternClassName
                )}
            />
            {/* Gradient fade over the pattern */}
            <div
                className={cn(
                    'absolute inset-0 bg-gradient-to-tr',
                    gradientClassName
                )}
            />
            {/* Content — on top */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}

export function LinesPatternCardBody({ className, ...props }) {
    return <div className={cn('p-6 md:p-8 lg:p-10', className)} {...props} />;
}
