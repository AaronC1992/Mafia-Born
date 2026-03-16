/**
 * factions.js
 * 
 * Manages crime family factions and their reputations.
 * Contains the crimeFamilies object with each family's details.
 */

// Crime Families and Factions
export const crimeFamilies = {
    torrino: {
        name: 'Torrino Family',
        description: 'Old-school Italian mafia family with traditional values and brutal enforcement',
        reputation: 0, // Player's standing with this family (-100 to 100)
        color: '#8b0000',
        boss: 'Don Salvatore Torrino',
        specialty: 'Protection rackets and loan sharking',
        lore: 'Founded in the 1920s by Italian immigrants, the Torrino family built their empire on respect, loyalty, and swift retribution. They control the restaurant district and numerous legitimate businesses as fronts.',
        passive: {
            name: 'The Books',
            description: 'Earn 5% interest on unspent cash daily (capped at $50K).',
            effectId: 'interest_cash',
            value: 0.05
        },
        signatureJob: {
            id: 'torrino_shakedown',
            name: 'Union Shake-down',
            type: 'charisma',
            description: 'Force the local union boss to pay up protection money.',
            baseReward: 800,
            repReward: 4.5,
            cooldown: 24 // hours
        }
    },
    kozlov: {
        name: 'Kozlov Bratva',
        description: 'Russian crime syndicate specializing in arms dealing and smuggling operations',
        reputation: 0,
        color: '#ff6b35',
        boss: 'Dimitri Kozlov',
        specialty: 'Weapons trafficking and smuggling',
        lore: 'Ex-military Russian operatives who brought military discipline to organized crime. They dominate the weapons trade and have connections across Eastern Europe for large-scale smuggling operations.',
        passive: {
            name: 'Arms Deal',
            description: 'Weapons cost 10% less. Small chance to regen ammo daily.',
            effectId: 'cheap_weapons_ammo_regen',
            discount: 0.10,
            regenChance: 0.25
        },
        signatureJob: {
            id: 'kozlov_convoy',
            name: 'Military Convoy Heist',
            type: 'violence',
            description: 'Ambush a military transport for high-grade weapons.',
            baseReward: 500, // Plus weapons
            repReward: 5.5,
            cooldown: 24
        }
    },
    chen: {
        name: 'Chen Triad',
        description: 'Sophisticated Asian crime organization focusing on high-tech crimes and drug operations',
        reputation: 0,
        color: '#2e8b57',
        boss: 'Master Chen Wei',
        specialty: 'Technology crimes and drug manufacturing',
        lore: 'Ancient traditions meet modern technology. The Chen Triad combines centuries-old honor codes with cutting-edge cybercrime and precision drug manufacturing. They value intelligence over brute force.',
        passive: {
            name: 'Smuggling Routes',
            description: 'Drug sales and transport jobs earn 30% more.',
            effectId: 'bonus_drug_income',
            multiplier: 1.30
        },
        signatureJob: {
            id: 'chen_cyber_raid',
            name: 'Cyber-Bank Raid',
            type: 'intelligence',
            description: "Hack into a major bank's server farm for a massive transfer.",
            baseReward: 1200,
            repReward: 5.0,
            cooldown: 24
        }
    },
    morales: {
        name: 'Morales Cartel',
        description: 'Powerful South American drug cartel with extensive territory control and distribution networks',
        reputation: 0,
        color: '#ff8c00',
        boss: 'El Jefe Morales',
        specialty: 'Drug manufacturing and distribution',
        lore: 'Born from the coca fields of South America, the Morales Cartel expanded northward with ruthless efficiency. They control vast territories and have corrupted officials at every level of government.',
        passive: {
            name: 'Cartel Connections',
            description: 'Violent crimes generate 20% less heat.',
            effectId: 'reduced_heat_violence',
            reduction: 0.20
        },
        signatureJob: {
            id: 'morales_border_run',
            name: 'Border Crossing Run',
            type: 'stealth',
            description: 'Smuggle a major shipment across the border undetected.',
            baseReward: 1000,
            repReward: 4.0,
            cooldown: 24
        }
    }
};

// Faction Reputation Effects
export const factionEffects = {
    torrino: {
        name: 'Torrino Family',
        icon: 'ITA',
        positiveEffects: [
            { level: 25, effect: '+5% sell prices at shops and fence' },
            { level: 50, effect: '+10% sell prices at shops and fence' },
            { level: 75, effect: '+15% sell prices, +10% territory defense' },
            { level: 100, effect: '+20% sell prices, +20% territory defense' }
        ],
        negativeEffects: [
            { level: -25, effect: '-5% sell prices at shops and fence' },
            { level: -50, effect: '-10% sell prices at shops and fence' },
            { level: -75, effect: '-15% sell prices, -10% territory defense' },
            { level: -100, effect: '-20% sell prices, -20% territory defense' }
        ]
    },
    kozlov: {
        name: 'Kozlov Bratva',
        icon: 'RUS',
        positiveEffects: [
            { level: 25, effect: '+3% weapon discount, +5% gang war power' },
            { level: 50, effect: '+6% weapon discount, +10% gang war power' },
            { level: 75, effect: '+10% weapon discount, +15% gang war power' },
            { level: 100, effect: '+15% weapon discount, +20% gang war power' }
        ],
        negativeEffects: [
            { level: -25, effect: '+3% weapon markup, -5% gang war power' },
            { level: -50, effect: '+6% weapon markup, -10% gang war power' },
            { level: -75, effect: '+10% weapon markup, -15% gang war power' },
            { level: -100, effect: '+15% weapon markup, -20% gang war power' }
        ]
    },
    chen: {
        name: 'Chen Triad',
        icon: 'CHN',
        positiveEffects: [
            { level: 25, effect: '+5% drug/smuggling income' },
            { level: 50, effect: '+10% drug/smuggling, +5% mission success' },
            { level: 75, effect: '+15% drug/smuggling, +10% mission success' },
            { level: 100, effect: '+20% drug/smuggling, +15% mission success' }
        ],
        negativeEffects: [
            { level: -25, effect: '-5% drug/smuggling income' },
            { level: -50, effect: '-10% drug/smuggling, -5% mission success' },
            { level: -75, effect: '-15% drug/smuggling, -10% mission success' },
            { level: -100, effect: '-20% drug/smuggling, -15% mission success' }
        ]
    },
    morales: {
        name: 'Morales Cartel',
        icon: 'MEX',
        positiveEffects: [
            { level: 25, effect: '-5% heat from all activities' },
            { level: 50, effect: '-10% heat, -5% hurt chance' },
            { level: 75, effect: '-15% heat, -10% hurt chance' },
            { level: 100, effect: '-20% heat, -15% hurt chance' }
        ],
        negativeEffects: [
            { level: -25, effect: '+5% heat from all activities' },
            { level: -50, effect: '+10% heat, +5% hurt chance' },
            { level: -75, effect: '+15% heat, +10% hurt chance' },
            { level: -100, effect: '+20% heat, +15% hurt chance' }
        ]
    },
    police: {
        name: 'Police Corruption',
        icon: '',
        positiveEffects: [
            { level: 25, effect: 'Cops look the other way occasionally' },
            { level: 50, effect: 'Officers tip you off about patrols' },
            { level: 75, effect: 'Detectives bury your case files' },
            { level: 100, effect: 'The department is in your pocket' }
        ],
        negativeEffects: [
            { level: -25, effect: 'Patrol cars linger on your streets' },
            { level: -50, effect: 'Detectives build a case against you' },
            { level: -75, effect: 'Task force assigned to your operation' },
            { level: -100, effect: 'Marked as public enemy number one' }
        ]
    },
    civilians: {
        name: 'Public Opinion',
        icon: '',
        positiveEffects: [
            { level: 25, effect: '+5% protection racket success' },
            { level: 50, effect: '+10% protection racket success & payments' },
            { level: 75, effect: '+15% protection racket success & payments' },
            { level: 100, effect: '+25% protection racket success & +30% payments' }
        ],
        negativeEffects: [
            { level: -25, effect: '-5% protection racket success' },
            { level: -50, effect: '-10% protection racket success & payments' },
            { level: -75, effect: '-15% protection racket success & payments' },
            { level: -100, effect: '-25% protection racket success & -30% payments' }
        ]
    },
    underground: {
        name: 'Criminal Underworld',
        icon: '',
        positiveEffects: [
            { level: 25, effect: '-5% black market prices' },
            { level: 50, effect: '-10% black market prices' },
            { level: 75, effect: '-15% black market prices' },
            { level: 100, effect: '-25% black market prices' }
        ],
        negativeEffects: [
            { level: -25, effect: '+5% black market prices' },
            { level: -50, effect: '+10% black market prices' },
            { level: -75, effect: '+15% black market prices' },
            { level: -100, effect: '+25% black market prices' }
        ]
    }
};

