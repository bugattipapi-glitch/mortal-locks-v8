import Image from 'next/image';

const avatarByPlayer: Record<string, string> = {
  aj: '/assets/avatars/aj.png',
  blaine: '/assets/avatars/blaine.png',
  brad: '/assets/avatars/brad.png',
  ceci: '/assets/avatars/ceci.png',
  jay: '/assets/avatars/jay.png',
  joe: '/assets/avatars/joe.png',
  kev: '/assets/avatars/kev.png',
  kohler: '/assets/avatars/kohler.png',
  steve: '/assets/avatars/steve.png',
};

function playerKey(name: string) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function PlayerAvatar({ name, size = 'default' }: { name: string; size?: 'tiny' | 'default' | 'xl' }) {
  const src = avatarByPlayer[playerKey(name)];
  const classes = `avatar player-avatar${size === 'default' ? '' : ` ${size}`}`;

  return (
    <span className={classes} aria-hidden="true">
      {src ? <Image src={src} alt="" fill sizes={size === 'xl' ? '72px' : size === 'tiny' ? '26px' : '37px'} /> : name.slice(0, 2).toUpperCase()}
    </span>
  );
}
