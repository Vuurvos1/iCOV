import { writable } from 'svelte/store';

export const cardsData = writable([]);
export const cardCanvasState = writable('');
export const highlightedCard = writable({});
