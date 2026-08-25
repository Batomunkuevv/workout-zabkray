export type SocialType = 'telegram' | 'vk' | 'youtube';
export type SocialLink = {
    type: SocialType;
    url: string;
    label: string;
};