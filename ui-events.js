import { EventBus } from './eventBus.js';
import { player } from './player.js';

function formatMoney(n) {
    try {
        return n.toLocaleString();
    } catch {
        return String(n);
    }
}

function refreshMoneyDisplay() {
    const moneyEl = document.getElementById('money-display');
    const dirtyEl = document.getElementById('dirty-money-display');
    if (!moneyEl) return;

    // Always show money — jail status is shown on the jail screen, not the status bar
    const money = player.money || 0;
    moneyEl.innerText = `Cash: $${formatMoney(money)}`;

    if (dirtyEl) {
        const dirty = player.dirtyMoney || 0;
        dirtyEl.innerText = `Dirty: $${formatMoney(dirty)}`;
    }
}

let _uiEventUnsubs = [];

export function initUIEvents() {
    if (window._uiEventsInit) return;
    window._uiEventsInit = true;

    _uiEventUnsubs.push(EventBus.on('moneyChanged', () => {
        refreshMoneyDisplay();
    }));

    _uiEventUnsubs.push(EventBus.on('dirtyMoneyChanged', () => {
        refreshMoneyDisplay();
    }));

    _uiEventUnsubs.push(EventBus.on('heatChanged', ({ oldValue, newValue }) => {
        const el = document.getElementById('wanted-level-display');
        if (el) el.innerText = `Heat: ${newValue}`;
    }));

    _uiEventUnsubs.push(EventBus.on('reputationChanged', ({ oldValue, newValue }) => {
        const el = document.getElementById('reputation-display');
        if (el) el.innerText = `Respect: ${newValue}`;
    }));

    _uiEventUnsubs.push(EventBus.on('jailStatusChanged', ({ inJail, jailTime }) => {
        const jailStatus = document.getElementById('jail-status');
        if (jailStatus) jailStatus.innerText = inJail ? `${jailTime}s` : 'Free';
    }));

    _uiEventUnsubs.push(EventBus.on('jailTimeUpdated', ({ jailTime }) => {
        const jailStatus = document.getElementById('jail-status');
        if (jailStatus && player.inJail) jailStatus.innerText = `${jailTime}s`;
    }));

    // Initial paint
    refreshMoneyDisplay();
    const wanted = document.getElementById('wanted-level-display');
    if (wanted) wanted.innerText = `Heat: ${player.heat}`;
}

export function cleanupUIEvents() {
    _uiEventUnsubs.forEach(unsub => unsub());
    _uiEventUnsubs = [];
    window._uiEventsInit = false;
}

