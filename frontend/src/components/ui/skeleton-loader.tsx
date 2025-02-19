import { Skeleton } from './skeleton';

export default function SkeletonLoader({ className, ...props }) {
    return (
        <div className={`${className} `}>
            <Skeleton {...props} className="animate-pulse animate-pulse-width w-full h-full" />
        </div>
    );
}
