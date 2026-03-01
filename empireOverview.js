/**
 * empireOverview.js
 * 
 * Empire Overview is now integrated into the Stats screen as a tab.
 * This function redirects to the Stats screen with the overview tab active.
 */

export function showEmpireOverview() {
    // Redirect to Stats screen → Empire Overview tab
    if (typeof window.showPlayerStats === 'function') {
        window.showPlayerStats();
        setTimeout(() => {
            if (typeof window.showPlayerStatsTab === 'function') {
                window.showPlayerStatsTab('overview');
            }
        }, 50);
    }
}

// Expose to window
window.showEmpireOverview = showEmpireOverview;
