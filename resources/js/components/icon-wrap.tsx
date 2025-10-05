import { Icon } from '@tabler/icons-react';

export default function IconWrap(props: { icon: Icon; stroke?: number; size?: number }) {
    const Component = props.icon;
    return <Component stroke={props.stroke ?? 1.5} size={props.size ?? 32} />;
}
