export default function IconWrap(props: { icon: React.ElementType; stroke?: number; size?: number }) {
    const Component = props.icon;
    return <Component stroke={props.stroke ?? 1.5} size={props.size ?? 32} />;
}
