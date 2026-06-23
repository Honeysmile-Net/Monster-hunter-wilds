/* ════════════════════════════════════════════════════════
   ARMOR TAB — High Rank α / β sets
   Per-piece skills + decoration slots + set bonus / group skill.
   Slot notation matches the game: ① / ② / ③ = lvl-1/2/3 slot, — = none.
   Data sourced from game8.co set pages (verified per-piece).
   ════════════════════════════════════════════════════════ */

/* slots: array of 3 ints (0 = empty, 1/2/3 = slot level)
   skills: [ [name, level], ... ]   (level omitted-as-0 means just the skill) */
var ARMOR_SETS = [
  {
    id: 'uth-duna-g', set: 'Uth Duna', element: 'Water', tag: 'γ', rarity: 8, verified: true,
    blurb: 'Arch-Tempered Uth Duna γ (event "These Roots Run Deep"). Tool Specialist + Peak Performance with the Lord\u2019s Soul group skill.',
    bonus: { name: "Uth Duna's Cover", tiers: [['Protective Veil I', 2], ['Protective Veil II', 4]] },
    variants: {
      'γ': {
        group: { name: "Lord's Soul", tiers: [['Guts (Tenacity)', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Duna Wildhelm γ',    slots: [2,2,0], skills: [['Peak Performance',2],['Earplugs',1]] },
          { slot: 'Chest', name: 'Duna Wildmail γ',     slots: [0,0,0], skills: [['Peak Performance',3],['Earplugs',2]] },
          { slot: 'Arms',  name: 'Duna Wildbraces γ',   slots: [2,0,0], skills: [['Tool Specialist',3],['Agitator',1]] },
          { slot: 'Waist', name: 'Duna Wildcoil γ',     slots: [3,3,0], skills: [['Tool Specialist',2]] },
          { slot: 'Legs',  name: 'Duna Wildgreaves γ',  slots: [3,1,1], skills: [['Quick Sheathe',3],['Agitator',1]] }
        ]
      }
    }
  },
  {
    id: 'gogmazios', set: 'Gogmazios', element: 'Dragon', tag: 'α / β', rarity: 8, verified: true,
    blurb: 'Title Update 4 Elder Dragon set (Oilwell Basin). Gogmapocalypse drives Mutual Hostility — each piece carries a different group skill.',
    bonus: { name: 'Gogmapocalypse', tiers: [['Mutual Hostility I', 2], ['Mutual Hostility II', 4]] },
    variants: {
      'α': {
        pieces: [
          { slot: 'Head',  name: 'Gogmazios Helm α',      slots: [3,1,0], skills: [['Peak Performance',2],['Elemental Absorption',2]], group: { name: "Zoh Shia's Pulse", tiers: [["Zoh Shia's Pulse",3]] } },
          { slot: 'Chest', name: 'Gogmazios Mail α',       slots: [3,2,0], skills: [['Adrenaline Rush',2],['Speed Eating',2],['Aquatic/Oilsilt Mobility',1]], group: { name: "Xu Wu's Vigor", tiers: [["Xu Wu's Vigor",3]] } },
          { slot: 'Arms',  name: 'Gogmazios Vambraces α',  slots: [2,1,0], skills: [['Maximum Might',2],['Agitator',1]], group: { name: "Fulgur Anjanath's Will", tiers: [["Fulgur Anjanath's Will",3]] } },
          { slot: 'Waist', name: 'Gogmazios Coil α',       slots: [2,1,1], skills: [['Burst',2],['Peak Performance',1]], group: { name: "Ebony Odogaron's Power", tiers: [["Ebony Odogaron's Power",3]] } },
          { slot: 'Legs',  name: 'Gogmazios Greaves α',    slots: [3,2,1], skills: [['Peak Performance',2],['Agitator',1]], group: { name: "Doshaguma's Might", tiers: [["Doshaguma's Might",3]] } }
        ]
      },
      'β': {
        pieces: [
          { slot: 'Head',  name: 'Gogmazios Helm β',      slots: [3,1,0], skills: [['Elemental Absorption',2],['Peak Performance',2]], group: { name: "Guardian Arkveld's Vitality", tiers: [["Guardian Arkveld's Vitality",3]] } },
          { slot: 'Chest', name: 'Gogmazios Mail β',       slots: [3,2,0], skills: [['Adrenaline Rush',2],['Speed Eating',2],['Aquatic/Oilsilt Mobility',1]], group: { name: "Rathalos's Flare", tiers: [["Rathalos's Flare",3]] } },
          { slot: 'Arms',  name: 'Gogmazios Vambraces β',  slots: [2,1,0], skills: [['Maximum Might',2],['Agitator',1]], group: { name: "Blangonga's Spirit", tiers: [["Blangonga's Spirit",3]] } },
          { slot: 'Waist', name: 'Gogmazios Coil β',       slots: [2,1,1], skills: [['Burst',2],['Peak Performance',1]], group: { name: "Mizutsune's Prowess", tiers: [["Mizutsune's Prowess",3]] } },
          { slot: 'Legs',  name: 'Gogmazios Greaves β',    slots: [3,2,1], skills: [['Peak Performance',2],['Agitator',1]], group: { name: "Gravios's Protection", tiers: [["Gravios's Protection",3]] } }
        ]
      }
    }
  },
  {
    id: 'arkveld-g', set: 'Arkveld', element: 'Dragon', tag: 'γ', rarity: 8, verified: true,
    blurb: 'Arch-Tempered Arkveld γ (Arkvulcan) — endgame elemental chassis with built-in Weakness Exploit 3, Convert Element and Elemental Absorption.',
    bonus: { name: "Arkveld's Hunger", tiers: [['Hasten Recovery I', 2], ['Hasten Recovery II', 4]] },
    variants: {
      'γ': {
        group: { name: "Lord's Soul", tiers: [['Guts (Tenacity)', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Arkvulcan Helm γ',      slots: [2,1,0], skills: [['Weakness Exploit',3]] },
          { slot: 'Chest', name: 'Arkvulcan Mail γ',       slots: [3,2,0], skills: [['Blight Resistance',1],['Convert Element',3]] },
          { slot: 'Arms',  name: 'Arkvulcan Vambraces γ',  slots: [1,1,0], skills: [['Weakness Exploit',2],['Flayer',2]] },
          { slot: 'Waist', name: 'Arkvulcan Coil γ',       slots: [2,2,1], skills: [['Flayer',1],['Elemental Absorption',3]] },
          { slot: 'Legs',  name: 'Arkvulcan Greaves γ',    slots: [3,3,0], skills: [['Flayer',2],['Blight Resistance',2]] }
        ]
      }
    }
  },
  {
    id: 'nu-udra-g', set: 'Nu Udra', element: 'Fire', tag: 'γ', rarity: 8, verified: true,
    blurb: 'Arch-Tempered Nu Udra γ — Burst 3 + Resentment offense with the Bad Blood set bonus; thrives at low health.',
    bonus: { name: "Nu Udra's Mutiny", tiers: [['Bad Blood I', 2], ['Bad Blood II', 4]] },
    variants: {
      'γ': {
        group: { name: "Lord's Soul", tiers: [['Guts (Tenacity)', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Udra Mirehelm γ',    slots: [1,1,1], skills: [['Burst',3]] },
          { slot: 'Chest', name: 'Udra Miremail γ',     slots: [3,3,0], skills: [['Counterstrike',2]] },
          { slot: 'Arms',  name: 'Udra Mirebraces γ',   slots: [3,1,1], skills: [['Resentment',3]] },
          { slot: 'Waist', name: 'Udra Mirecoil γ',     slots: [2,0,0], skills: [['Ambush',1],['Burst',2]] },
          { slot: 'Legs',  name: 'Udra Miregreaves γ',  slots: [2,0,0], skills: [['Speed Eating',3],['Resentment',2],['Counterstrike',1]] }
        ]
      }
    }
  },
  {
    id: 'rey-dau-g', set: 'Rey Dau', element: 'Thunder', tag: 'γ', rarity: 8, verified: true,
    blurb: 'Arch-Tempered Rey Dau γ — aggressive thunder set with Latent Power 3, Weakness Exploit and Maximum Might built in.',
    bonus: { name: "Rey Dau's Voltage", tiers: [['Thunderous Roar I', 2], ['Thunderous Roar II', 4]] },
    variants: {
      'γ': {
        group: { name: "Lord's Soul", tiers: [['Guts (Tenacity)', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Rey Sandhelm γ',    slots: [3,0,0], skills: [['Stamina Surge',1],['Weakness Exploit',1],['Maximum Might',1]] },
          { slot: 'Chest', name: 'Rey Sandmail γ',     slots: [1,0,0], skills: [['Latent Power',3]] },
          { slot: 'Arms',  name: 'Rey Sandbraces γ',   slots: [3,3,0], skills: [['Evade Extender',2]] },
          { slot: 'Waist', name: 'Rey Sandcoil γ',     slots: [0,0,0], skills: [['Latent Power',2],['Maximum Might',2]] },
          { slot: 'Legs',  name: 'Rey Sandgreaves γ',  slots: [3,0,0], skills: [['Stun Resistance',3],['Stamina Surge',2]] }
        ]
      }
    }
  },
  {
    id: 'rey-dau', set: 'Rey Dau', element: 'Thunder', tag: 'α / β', rarity: 7, verified: true,
    blurb: 'Thunder offense built on Maximum Might + Latent Power — a staple aggressive set.',
    bonus: { name: "Rey Dau's Voltage", tiers: [['Thunderous Roar I', 2], ['Thunderous Roar II', 4]] },
    variants: {
      'α': {
        group: { name: "Lord's Favor", tiers: [['Inspiration', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Rey Sandhelm α',    slots: [0,0,0], skills: [['Evade Extender',1],['Latent Power',2]] },
          { slot: 'Chest', name: 'Rey Sandmail α',     slots: [1,1,0], skills: [['Stamina Surge',1],['Maximum Might',2]] },
          { slot: 'Arms',  name: 'Rey Sandbraces α',   slots: [2,0,0], skills: [['Stun Resistance',1],['Latent Power',2]] },
          { slot: 'Waist', name: 'Rey Sandcoil α',     slots: [2,0,0], skills: [['Stun Resistance',2],['Stamina Surge',2]] },
          { slot: 'Legs',  name: 'Rey Sandgreaves α',  slots: [3,0,0], skills: [['Latent Power',1],['Maximum Might',1]] }
        ]
      },
      'β': {
        group: { name: "Lord's Fury", tiers: [['Resuscitate', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Rey Sandhelm β',     slots: [3,0,0], skills: [['Evade Extender',1],['Latent Power',1]] },
          { slot: 'Chest', name: 'Rey Sandmail β',      slots: [2,1,1], skills: [['Stamina Surge',1],['Maximum Might',1]] },
          { slot: 'Arms',  name: 'Rey Sandbraces β',    slots: [3,0,0], skills: [['Latent Power',2]] },
          { slot: 'Waist', name: 'Rey Sandcoil β',      slots: [3,1,0], skills: [['Stun Resistance',1],['Stamina Surge',1]] },
          { slot: 'Legs',  name: 'Rey Sandgreaves β',   slots: [3,1,1], skills: [['Latent Power',1]] }
        ]
      }
    }
  },
  {
    id: 'gore-magala', set: 'Gore Magala', element: 'Dragon', tag: 'α / β', rarity: 7, verified: true,
    blurb: 'Evade Window + Antivirus core. Black Eclipse set bonus rewards the Frenzy playstyle.',
    bonus: { name: "Gore Magala's Tyranny", tiers: [['Black Eclipse I', 2], ['Black Eclipse II', 4]] },
    variants: {
      'α': {
        group: { name: 'Scaling Prowess', tiers: [['Master Mounter', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Gore Helm α',       slots: [2,0,0], skills: [['Evade Window',2],['Coalescence',1]] },
          { slot: 'Chest', name: 'Gore Mail α',        slots: [3,0,0], skills: [['Evade Window',2],['Antivirus',1]] },
          { slot: 'Arms',  name: 'Gore Vambraces α',   slots: [2,1,0], skills: [['Evade Window',1],['Constitution',2]] },
          { slot: 'Waist', name: 'Gore Coil α',        slots: [3,1,0], skills: [['Constitution',2],['Antivirus',1]] },
          { slot: 'Legs',  name: 'Gore Greaves α',     slots: [3,1,0], skills: [['Flinch Free',2],['Antivirus',1]] }
        ]
      },
      'β': {
        group: { name: 'Scale Layering', tiers: [['Adrenaline', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Gore Helm β',       slots: [3,1,0], skills: [['Evade Window',1],['Coalescence',1]] },
          { slot: 'Chest', name: 'Gore Mail β',        slots: [3,1,0], skills: [['Evade Window',2]] },
          { slot: 'Arms',  name: 'Gore Vambraces β',   slots: [2,2,0], skills: [['Evade Window',1],['Constitution',1]] },
          { slot: 'Waist', name: 'Gore Coil β',        slots: [3,2,0], skills: [['Constitution',2]] },
          { slot: 'Legs',  name: 'Gore Greaves β',     slots: [3,1,1], skills: [['Flinch Free',1],['Antivirus',1]] }
        ]
      }
    }
  },
  {
    id: 'arkveld', set: 'Arkveld', element: 'Dragon', tag: 'α / β', rarity: 8,
    blurb: 'All-round aggressive set — Maximum Might, Agitator and a Hasten Recovery bonus that keeps the pace up.',
    bonus: { name: "Arkveld's Hunger", tiers: [['Hasten Recovery I', 2], ['Hasten Recovery II', 4]] },
    variants: {
      'α': {
        group: { name: "Lord's Favor", tiers: [['Inspiration', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Arkveld Helm α',      slots: [1,0,0], skills: [['Maximum Might',1],['Agitator',1]] },
          { slot: 'Chest', name: 'Arkveld Mail α',       slots: [1,1,0], skills: [['Agitator',2]] },
          { slot: 'Arms',  name: 'Arkveld Vambraces α',  slots: [2,0,0], skills: [['Maximum Might',1],['Latent Power',1]] },
          { slot: 'Waist', name: 'Arkveld Coil α',       slots: [1,1,0], skills: [['Agitator',1],['Latent Power',1]] },
          { slot: 'Legs',  name: 'Arkveld Greaves α',    slots: [2,0,0], skills: [['Maximum Might',1],['Latent Power',1]] }
        ]
      },
      'β': {
        group: { name: "Lord's Fury", tiers: [['Resuscitate', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Arkveld Helm β',      slots: [2,0,0], skills: [['Agitator',1]] },
          { slot: 'Chest', name: 'Arkveld Mail β',       slots: [2,1,0], skills: [['Agitator',2]] },
          { slot: 'Arms',  name: 'Arkveld Vambraces β',  slots: [3,0,0], skills: [['Maximum Might',1]] },
          { slot: 'Waist', name: 'Arkveld Coil β',       slots: [2,1,0], skills: [['Latent Power',1]] },
          { slot: 'Legs',  name: 'Arkveld Greaves β',    slots: [2,1,0], skills: [['Maximum Might',1]] }
        ]
      }
    }
  },
  {
    id: 'g-arkveld', set: 'Guardian Arkveld', element: 'Dragon', tag: 'α / β', rarity: 8,
    blurb: 'The meta damage chassis — Adrenaline Rush set bonus with Latent Power and generous slots.',
    bonus: { name: "Guardian's Pulse", tiers: [['Adrenaline Rush I', 2], ['Adrenaline Rush II', 4]] },
    variants: {
      'α': {
        group: { name: 'Refreshing Phial', tiers: [['Resuscitate', 3]] },
        pieces: [
          { slot: 'Head',  name: 'G. Arkveld Helm α',      slots: [1,0,0], skills: [['Latent Power',1],['Agitator',1]] },
          { slot: 'Chest', name: 'G. Arkveld Mail α',       slots: [1,0,0], skills: [['Latent Power',2],['Constitution',1]] },
          { slot: 'Arms',  name: 'G. Arkveld Vambraces α',  slots: [2,0,0], skills: [['Agitator',1],['Constitution',2]] },
          { slot: 'Waist', name: 'G. Arkveld Coil α',       slots: [1,1,0], skills: [['Latent Power',1],['Agitator',1]] },
          { slot: 'Legs',  name: 'G. Arkveld Greaves α',    slots: [2,0,0], skills: [['Constitution',1],['Agitator',1]] }
        ]
      },
      'β': {
        group: { name: 'Refreshing Phial', tiers: [['Resuscitate', 3]] },
        pieces: [
          { slot: 'Head',  name: 'G. Arkveld Helm β',      slots: [2,0,0], skills: [['Agitator',1]] },
          { slot: 'Chest', name: 'G. Arkveld Mail β',       slots: [2,1,0], skills: [['Latent Power',2]] },
          { slot: 'Arms',  name: 'G. Arkveld Vambraces β',  slots: [3,0,0], skills: [['Constitution',2]] },
          { slot: 'Waist', name: 'G. Arkveld Coil β',       slots: [2,1,0], skills: [['Agitator',1]] },
          { slot: 'Legs',  name: 'G. Arkveld Greaves β',    slots: [3,0,0], skills: [['Constitution',1]] }
        ]
      }
    }
  },
  {
    id: 'blangonga', set: 'Blangonga', element: 'Ice', tag: 'α / β', rarity: 6,
    blurb: 'Mobility and stamina set — Constitution, Marathon Runner and Evade Extender for relentless uptime.',
    bonus: { name: "Blangonga's Hunger", tiers: [['Adrenaline Rush I', 2], ['Adrenaline Rush II', 4]] },
    variants: {
      'α': {
        group: { name: 'Alpha Mobility', tiers: [['Evade Extender', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Blango Helm α',      slots: [2,0,0], skills: [['Constitution',2]] },
          { slot: 'Chest', name: 'Blango Mail α',       slots: [1,1,0], skills: [['Marathon Runner',1],['Constitution',1]] },
          { slot: 'Arms',  name: 'Blango Vambraces α',  slots: [1,0,0], skills: [['Evade Extender',1],['Constitution',1]] },
          { slot: 'Waist', name: 'Blango Coil α',       slots: [2,0,0], skills: [['Marathon Runner',2]] },
          { slot: 'Legs',  name: 'Blango Greaves α',    slots: [2,1,0], skills: [['Evade Extender',1],['Marathon Runner',1]] }
        ]
      },
      'β': {
        group: { name: 'Alpha Mobility', tiers: [['Evade Extender', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Blango Helm β',      slots: [3,0,0], skills: [['Constitution',1]] },
          { slot: 'Chest', name: 'Blango Mail β',       slots: [2,1,0], skills: [['Marathon Runner',1]] },
          { slot: 'Arms',  name: 'Blango Vambraces β',  slots: [2,1,0], skills: [['Evade Extender',1]] },
          { slot: 'Waist', name: 'Blango Coil β',       slots: [3,0,0], skills: [['Marathon Runner',1]] },
          { slot: 'Legs',  name: 'Blango Greaves β',    slots: [3,1,0], skills: [['Evade Extender',1]] }
        ]
      }
    }
  },
  {
    id: 'nu-udra', set: 'Nu Udra', element: 'Fire', tag: 'α / β', rarity: 7,
    blurb: 'Fire-flavoured comfort set with Flayer and Burst — strong for elemental and status builds.',
    bonus: { name: "Nu Udra's Demolisher", tiers: [['Flayer I', 2], ['Flayer II', 4]] },
    variants: {
      'α': {
        group: { name: 'Channeled Heat', tiers: [['Burst', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Nu Udra Helm α',      slots: [1,0,0], skills: [['Burst',1],['Flayer',1]] },
          { slot: 'Chest', name: 'Nu Udra Mail α',       slots: [2,0,0], skills: [['Burst',1],['Constitution',1]] },
          { slot: 'Arms',  name: 'Nu Udra Vambraces α',  slots: [1,1,0], skills: [['Flayer',1],['Burst',1]] },
          { slot: 'Waist', name: 'Nu Udra Coil α',       slots: [2,0,0], skills: [['Flayer',1],['Constitution',1]] },
          { slot: 'Legs',  name: 'Nu Udra Greaves α',    slots: [2,1,0], skills: [['Burst',1]] }
        ]
      },
      'β': {
        group: { name: 'Channeled Heat', tiers: [['Burst', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Nu Udra Helm β',      slots: [2,0,0], skills: [['Burst',1]] },
          { slot: 'Chest', name: 'Nu Udra Mail β',       slots: [3,0,0], skills: [['Burst',1]] },
          { slot: 'Arms',  name: 'Nu Udra Vambraces β',  slots: [2,1,0], skills: [['Flayer',1]] },
          { slot: 'Waist', name: 'Nu Udra Coil β',       slots: [3,0,0], skills: [['Flayer',1]] },
          { slot: 'Legs',  name: 'Nu Udra Greaves β',    slots: [3,1,0], skills: [['Burst',1]] }
        ]
      }
    }
  },
  {
    id: 'ajarakan', set: 'Ajarakan', element: 'Fire', tag: 'α / β', rarity: 6,
    blurb: 'Aggressive fire bruiser — Counterstrike and Adrenaline Rush for high-risk, high-reward damage.',
    bonus: { name: "Ajarakan's Flame", tiers: [['Counterstrike I', 2], ['Counterstrike II', 4]] },
    variants: {
      'α': {
        group: { name: 'Burning Spirit', tiers: [['Adrenaline Rush', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Ajarakan Helm α',      slots: [1,0,0], skills: [['Counterstrike',1]] },
          { slot: 'Chest', name: 'Ajarakan Mail α',       slots: [1,1,0], skills: [['Counterstrike',1],['Constitution',1]] },
          { slot: 'Arms',  name: 'Ajarakan Vambraces α',  slots: [2,0,0], skills: [['Adrenaline Rush',1]] },
          { slot: 'Waist', name: 'Ajarakan Coil α',       slots: [1,0,0], skills: [['Counterstrike',1],['Adrenaline Rush',1]] },
          { slot: 'Legs',  name: 'Ajarakan Greaves α',    slots: [2,1,0], skills: [['Constitution',1]] }
        ]
      },
      'β': {
        group: { name: 'Burning Spirit', tiers: [['Adrenaline Rush', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Ajarakan Helm β',      slots: [2,0,0], skills: [['Counterstrike',1]] },
          { slot: 'Chest', name: 'Ajarakan Mail β',       slots: [2,1,0], skills: [['Counterstrike',1]] },
          { slot: 'Arms',  name: 'Ajarakan Vambraces β',  slots: [3,0,0], skills: [['Adrenaline Rush',1]] },
          { slot: 'Waist', name: 'Ajarakan Coil β',       slots: [2,1,0], skills: [['Counterstrike',1]] },
          { slot: 'Legs',  name: 'Ajarakan Greaves β',    slots: [3,0,0], skills: [['Constitution',1]] }
        ]
      }
    }
  },
  {
    id: 'gravios', set: 'Gravios', element: 'Fire', tag: 'α / β', rarity: 6,
    blurb: 'Tank / defensive anchor — Guard, Offensive Guard and Bulwark for blocking weapons.',
    bonus: { name: "Gravios's Obstinacy", tiers: [['Bulwark I', 2], ['Bulwark II', 4]] },
    variants: {
      'α': {
        group: { name: 'Iron Wall', tiers: [['Guard', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Gravios Helm α',      slots: [1,0,0], skills: [['Guard',2]] },
          { slot: 'Chest', name: 'Gravios Mail α',       slots: [1,0,0], skills: [['Guard',1],['Bulwark',1]] },
          { slot: 'Arms',  name: 'Gravios Vambraces α',  slots: [1,1,0], skills: [['Guard',1],['Offensive Guard',1]] },
          { slot: 'Waist', name: 'Gravios Coil α',       slots: [2,0,0], skills: [['Guard',2]] },
          { slot: 'Legs',  name: 'Gravios Greaves α',    slots: [1,0,0], skills: [['Offensive Guard',1],['Bulwark',1]] }
        ]
      },
      'β': {
        group: { name: 'Iron Wall', tiers: [['Guard', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Gravios Helm β',      slots: [2,0,0], skills: [['Guard',1]] },
          { slot: 'Chest', name: 'Gravios Mail β',       slots: [2,0,0], skills: [['Guard',1]] },
          { slot: 'Arms',  name: 'Gravios Vambraces β',  slots: [2,1,0], skills: [['Offensive Guard',1]] },
          { slot: 'Waist', name: 'Gravios Coil β',       slots: [3,0,0], skills: [['Guard',1]] },
          { slot: 'Legs',  name: 'Gravios Greaves β',    slots: [2,1,0], skills: [['Bulwark',1]] }
        ]
      }
    }
  },
  {
    id: 'doshaguma', set: 'Doshaguma', element: 'None', tag: 'α / β', rarity: 6,
    blurb: 'Raw bruiser staple — Adrenaline Rush set bonus with Constitution to fuel aggressive uptime.',
    bonus: { name: "Doshaguma's Might", tiers: [['Adrenaline Rush I', 2], ['Adrenaline Rush II', 4]] },
    variants: {
      'α': {
        group: { name: 'Battle Prowess', tiers: [['Counterstrike', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Doshaguma Helm α',      slots: [1,0,0], skills: [['Constitution',2]] },
          { slot: 'Chest', name: 'Doshaguma Mail α',       slots: [1,1,0], skills: [['Adrenaline Rush',1],['Constitution',1]] },
          { slot: 'Arms',  name: 'Doshaguma Vambraces α',  slots: [2,0,0], skills: [['Counterstrike',1]] },
          { slot: 'Waist', name: 'Doshaguma Coil α',       slots: [1,0,0], skills: [['Constitution',1],['Counterstrike',1]] },
          { slot: 'Legs',  name: 'Doshaguma Greaves α',    slots: [2,1,0], skills: [['Adrenaline Rush',1]] }
        ]
      },
      'β': {
        group: { name: 'Battle Prowess', tiers: [['Counterstrike', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Doshaguma Helm β',      slots: [2,0,0], skills: [['Constitution',1]] },
          { slot: 'Chest', name: 'Doshaguma Mail β',       slots: [2,1,0], skills: [['Constitution',1]] },
          { slot: 'Arms',  name: 'Doshaguma Vambraces β',  slots: [3,0,0], skills: [['Counterstrike',1]] },
          { slot: 'Waist', name: 'Doshaguma Coil β',       slots: [2,1,0], skills: [['Counterstrike',1]] },
          { slot: 'Legs',  name: 'Doshaguma Greaves β',    slots: [3,0,0], skills: [['Adrenaline Rush',1]] }
        ]
      }
    }
  },
  {
    id: 'mizutsune', set: 'Mizutsune', element: 'Water', tag: 'α / β', rarity: 6,
    blurb: 'Slippery evasion set — Bubbly Dance set bonus with Evade Window for graceful, low-risk play.',
    bonus: { name: "Mizutsune's Grace", tiers: [['Bubbly Dance I', 2], ['Bubbly Dance II', 4]] },
    variants: {
      'α': {
        group: { name: 'Mobility Mastery', tiers: [['Evade Window', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Mizu Helm α',      slots: [2,0,0], skills: [['Evade Window',1],['Bubbly Dance',1]] },
          { slot: 'Chest', name: 'Mizu Mail α',       slots: [1,1,0], skills: [['Evade Window',2]] },
          { slot: 'Arms',  name: 'Mizu Vambraces α',  slots: [1,0,0], skills: [['Bubbly Dance',1],['Constitution',1]] },
          { slot: 'Waist', name: 'Mizu Coil α',       slots: [2,0,0], skills: [['Evade Window',1],['Bubbly Dance',1]] },
          { slot: 'Legs',  name: 'Mizu Greaves α',    slots: [2,1,0], skills: [['Constitution',1]] }
        ]
      },
      'β': {
        group: { name: 'Mobility Mastery', tiers: [['Evade Window', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Mizu Helm β',      slots: [3,0,0], skills: [['Evade Window',1]] },
          { slot: 'Chest', name: 'Mizu Mail β',       slots: [2,1,0], skills: [['Evade Window',1]] },
          { slot: 'Arms',  name: 'Mizu Vambraces β',  slots: [2,1,0], skills: [['Bubbly Dance',1]] },
          { slot: 'Waist', name: 'Mizu Coil β',       slots: [3,0,0], skills: [['Evade Window',1]] },
          { slot: 'Legs',  name: 'Mizu Greaves β',    slots: [3,1,0], skills: [['Constitution',1]] }
        ]
      }
    }
  },
  {
    id: 'seregios', set: 'Seregios', element: 'None', tag: 'α / β', rarity: 7,
    blurb: 'TU2 sharpness set — Razor\u2019s Edge set bonus keeps your blade keen via Bladescale Honing.',
    bonus: { name: "Seregios's Tenacity", tiers: [["Razor's Edge I", 2], ["Razor's Edge II", 4]] },
    variants: {
      'α': {
        group: { name: 'Battle Prowess', tiers: [['Counterstrike', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Seregios Helm α',      slots: [2,0,0], skills: [['Bladescale Honing',1]] },
          { slot: 'Chest', name: 'Seregios Mail α',       slots: [1,1,0], skills: [['Bladescale Honing',1],['Constitution',1]] },
          { slot: 'Arms',  name: 'Seregios Vambraces α',  slots: [1,0,0], skills: [['Counterstrike',1],['Recovery Up',1]] },
          { slot: 'Waist', name: 'Seregios Coil α',       slots: [2,0,0], skills: [['Bladescale Honing',1]] },
          { slot: 'Legs',  name: 'Seregios Greaves α',    slots: [2,1,0], skills: [['Counterstrike',1]] }
        ]
      },
      'β': {
        group: { name: 'Battle Prowess', tiers: [['Counterstrike', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Seregios Helm β',      slots: [3,0,0], skills: [['Bladescale Honing',1]] },
          { slot: 'Chest', name: 'Seregios Mail β',       slots: [2,1,0], skills: [['Bladescale Honing',1]] },
          { slot: 'Arms',  name: 'Seregios Vambraces β',  slots: [2,1,0], skills: [['Counterstrike',1]] },
          { slot: 'Waist', name: 'Seregios Coil β',       slots: [3,0,0], skills: [['Bladescale Honing',1]] },
          { slot: 'Legs',  name: 'Seregios Greaves β',    slots: [3,1,0], skills: [['Recovery Up',1]] }
        ]
      }
    }
  },
  {
    id: 'rathalos', set: 'Rathalos', element: 'Fire', tag: 'α / β', rarity: 6,
    blurb: 'Classic Fire flagship — pairs Fire Attack with offensive utility for elemental builds.',
    bonus: { name: "Rathalos's Mastery", tiers: [['Master\u2019s Touch I', 2], ['Master\u2019s Touch II', 4]] },
    variants: {
      'α': {
        group: { name: 'Fire Prowess', tiers: [['Fire Attack', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Rathalos Helm α',      slots: [1,0,0], skills: [['Fire Attack',1],['Weakness Exploit',1]] },
          { slot: 'Chest', name: 'Rathalos Mail α',       slots: [1,1,0], skills: [['Weakness Exploit',1]] },
          { slot: 'Arms',  name: 'Rathalos Vambraces α',  slots: [2,0,0], skills: [['Fire Attack',1],['Attack Boost',1]] },
          { slot: 'Waist', name: 'Rathalos Coil α',       slots: [1,1,0], skills: [['Weakness Exploit',1],['Fire Attack',1]] },
          { slot: 'Legs',  name: 'Rathalos Greaves α',    slots: [2,0,0], skills: [['Attack Boost',1]] }
        ]
      },
      'β': {
        group: { name: 'Fire Prowess', tiers: [['Fire Attack', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Rathalos Helm β',      slots: [2,0,0], skills: [['Weakness Exploit',1]] },
          { slot: 'Chest', name: 'Rathalos Mail β',       slots: [2,1,0], skills: [['Weakness Exploit',1]] },
          { slot: 'Arms',  name: 'Rathalos Vambraces β',  slots: [3,0,0], skills: [['Attack Boost',1]] },
          { slot: 'Waist', name: 'Rathalos Coil β',       slots: [2,1,0], skills: [['Fire Attack',1]] },
          { slot: 'Legs',  name: 'Rathalos Greaves β',    slots: [3,0,0], skills: [['Attack Boost',1]] }
        ]
      }
    }
  },
  {
    id: 'rathian', set: 'Rathian', element: 'Fire', tag: 'α / β', rarity: 6,
    blurb: 'Survival-leaning set — Poison utility plus recovery skills for a sustainable loadout.',
    bonus: { name: "Rathian's Rage", tiers: [['Poison Functionality I', 2], ['Poison Functionality II', 4]] },
    variants: {
      'α': {
        group: { name: 'Medicating', tiers: [['Recovery Up', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Rathian Helm α',      slots: [1,0,0], skills: [['Recovery Up',1],['Poison Attack',1]] },
          { slot: 'Chest', name: 'Rathian Mail α',       slots: [1,1,0], skills: [['Recovery Up',1]] },
          { slot: 'Arms',  name: 'Rathian Vambraces α',  slots: [2,0,0], skills: [['Poison Attack',1],['Constitution',1]] },
          { slot: 'Waist', name: 'Rathian Coil α',       slots: [1,1,0], skills: [['Recovery Up',1],['Poison Attack',1]] },
          { slot: 'Legs',  name: 'Rathian Greaves α',    slots: [2,0,0], skills: [['Constitution',1]] }
        ]
      },
      'β': {
        group: { name: 'Medicating', tiers: [['Recovery Up', 3]] },
        pieces: [
          { slot: 'Head',  name: 'Rathian Helm β',      slots: [2,0,0], skills: [['Recovery Up',1]] },
          { slot: 'Chest', name: 'Rathian Mail β',       slots: [2,1,0], skills: [['Recovery Up',1]] },
          { slot: 'Arms',  name: 'Rathian Vambraces β',  slots: [3,0,0], skills: [['Poison Attack',1]] },
          { slot: 'Waist', name: 'Rathian Coil β',       slots: [2,1,0], skills: [['Poison Attack',1]] },
          { slot: 'Legs',  name: 'Rathian Greaves β',    slots: [3,0,0], skills: [['Constitution',1]] }
        ]
      }
    }
  }
];

var SLOT_GLYPH = { 0: '—', 1: '①', 2: '②', 3: '③' };

// MH Wilds rarity → accent colour (HR armor spans R5–R8)
// Max level per skill (MH Wilds). Used to show "3/5" in the build planner.
var SKILL_MAX = {
  'Attack Boost': 5, 'Agitator': 5, 'Maximum Might': 3, 'Latent Power': 5, 'Weakness Exploit': 5,
  'Critical Eye': 5, 'Critical Boost': 5, 'Critical Draw': 3, 'Peak Performance': 3, 'Resentment': 5,
  'Resuscitate': 3, 'Counterstrike': 3, 'Adrenaline Rush': 5, 'Burst': 5, 'Coalescence': 3,
  'Flayer': 5, 'Offensive Guard': 3, 'Guard': 5, 'Guard Up': 1, 'Bulwark': 3, 'Adamant': 1,
  'Evade Window': 5, 'Evade Extender': 3, 'Constitution': 5, 'Stamina Surge': 3, 'Marathon Runner': 3,
  'Stun Resistance': 3, 'Flinch Free': 3, 'Antivirus': 3, 'Recovery Up': 3, 'Recovery Speed': 3,
  'Hasten Recovery': 2, 'Speed Eating': 3, 'Quick Sheathe': 3, 'Earplugs': 5, 'Tremor Resistance': 3,
  'Divine Blessing': 5, 'Bubbly Dance': 3, 'Tool Specialist': 3, 'Master\u2019s Touch': 3, "Master's Touch": 3,
  'Fire Attack': 5, 'Water Attack': 5, 'Thunder Attack': 5, 'Ice Attack': 5, 'Dragon Attack': 5,
  'Poison Attack': 3, 'Paralysis Attack': 3, 'Sleep Attack': 3, 'Blast Attack': 3,
  'Elemental Absorption': 3, 'Convert Element': 3, 'Bladescale Honing': 1, 'Blight Resistance': 3,
  'Blight Res': 3, 'Aquatic/Oilsilt Mobility': 1
};
function armorSkillMax(name) { return SKILL_MAX[name] || null; }

var RARITY_COLOR = {
  5: '#3fa46a',  // green
  6: '#3a86c8',  // blue
  7: '#9a6bd0',  // purple
  8: '#e07b2e'   // orange (Arch-Tempered / endgame)
};
function armorRarityBadge(r) {
  if (!r) return '';
  var c = RARITY_COLOR[r] || 'var(--text-muted)';
  return '<span class="armor-rar" title="Rarity ' + r + '" style="color:' + c +
    ';border-color:' + c + '66;background:' + c + '1f;"><span class="armor-rar-dot" style="background:' + c +
    ';"></span>R' + r + '</span>';
}
// Per-slot equipment icons (Fextralife MHWilds wiki)
var SLOT_ICON_URL = {
  Head:  'https://static0.fextralifeimages.com/file/monsterhunterwilds/5/59/Head_armor_icons_mhw_wiki_guide.png',
  Chest: 'https://static0.fextralifeimages.com/file/monsterhunterwilds/e/ed/Chest_armor_icons_mhw_wiki_guide.png',
  Arms:  'https://static0.fextralifeimages.com/file/monsterhunterwilds/1/19/Arms_armor_icons_mhw_wiki_guide.png',
  Waist: 'https://static0.fextralifeimages.com/file/monsterhunterwilds/5/52/Waist_armor_icons_mhw_wiki_guide.png',
  Legs:  'https://static0.fextralifeimages.com/file/monsterhunterwilds/5/5b/Legs_armor_icons_mhw_wiki_guide.png'
};
var SLOT_EMOJI = { Head: '🪖', Chest: '🥋', Arms: '🧤', Waist: '🎗', Legs: '🥾' };
function armorSlotIcon(kind, rarity) {
  var c = RARITY_COLOR[rarity] || '#9b8f7a';
  var url = SLOT_ICON_URL[kind];
  if (!url) return '<span class="armor-pc-ic" style="color:' + c + '">' + (SLOT_EMOJI[kind] || '▪') + '</span>';
  return '<span class="armor-pc-ic-mask" title="' + kind + (rarity ? ' · R' + rarity : '') +
    '" style="background-color:' + c + ';-webkit-mask-image:url(' + url + ');mask-image:url(' + url + ');"></span>';
}

var armorActiveVariant = {};   // id -> 'α' | 'β'
var armorSearchTerm = '';
var armorSlotFilter = '';
var armorInited = false;
var armorBuild = {};           // slotKind -> { setId, variant }
var SLOT_ORDER = ['Head', 'Chest', 'Arms', 'Waist', 'Legs'];

function armorLoadBuild() {
  try { armorBuild = JSON.parse(localStorage.getItem('mhw-armor-build') || '{}') || {}; }
  catch (e) { armorBuild = {}; }
}
function armorSaveBuild() {
  try { localStorage.setItem('mhw-armor-build', JSON.stringify(armorBuild)); } catch (e) {}
}
function armorFindSet(id) {
  for (var i = 0; i < ARMOR_SETS.length; i++) if (ARMOR_SETS[i].id === id) return ARMOR_SETS[i];
  return null;
}
function armorPieceFor(setId, variant, kind) {
  var s = armorFindSet(setId); if (!s) return null;
  var vr = s.variants[variant]; if (!vr) return null;
  for (var i = 0; i < vr.pieces.length; i++) if (vr.pieces[i].slot === kind) return vr.pieces[i];
  return null;
}
function armorGroupTiers(gname) {
  for (var i = 0; i < ARMOR_SETS.length; i++) {
    var vs = ARMOR_SETS[i].variants;
    for (var k in vs) {
      if (vs[k].group && vs[k].group.name === gname) return vs[k].group.tiers;
      if (vs[k].pieces) for (var j = 0; j < vs[k].pieces.length; j++) {
        var pg = vs[k].pieces[j].group;
        if (pg && pg.name === gname) return pg.tiers;
      }
    }
  }
  return null;
}

function armorInit() {
  armorInjectCss();
  if (!armorInited) {
    ARMOR_SETS.forEach(function (s) { armorActiveVariant[s.id] = 'α'; });
    armorLoadBuild();
    armorInited = true;
    var intro = document.getElementById('armor-intro');
    if (intro) intro.innerHTML =
      '<div class="weather-intro-title">High Rank Armor — Build Planner</div>';
  }
  armorRenderBuild();
  armorRender();
}

/* ── build actions ── */
function armorEquip(setId, variant, kind) {
  armorBuild[kind] = { setId: setId, variant: variant };
  armorSaveBuild(); armorRenderBuild(); armorRender();
}
function armorUnequip(kind) {
  delete armorBuild[kind];
  armorSaveBuild(); armorRenderBuild(); armorRender();
}
function armorClearBuild() {
  armorBuild = {};
  armorSaveBuild(); armorRenderBuild(); armorRender();
}

/* ── shareable build codes (deterministic) ── */
var VAR_ORD = { 'α': 0, 'β': 1, 'γ': 2 };
var ORD_VAR = ['α', 'β', 'γ'];

// One 2-char base36 token per piece encodes BOTH set index and variant.
// value = setIndex*3 + variantOrdinal + 1   (0 = empty slot). 2 base36 chars → up to ~430 sets.
function armorPieceToken(setId, variant) {
  var idx = -1;
  for (var i = 0; i < ARMOR_SETS.length; i++) if (ARMOR_SETS[i].id === setId) { idx = i; break; }
  if (idx < 0) return '00';
  var n = idx * 3 + (VAR_ORD[variant] || 0) + 1;
  var c = n.toString(36).toUpperCase();
  return c.length < 2 ? '0' + c : c;
}
function armorTokenDecode(tok) {
  var n = parseInt(tok, 36);
  if (!n || isNaN(n)) return null;
  n -= 1;
  var set = ARMOR_SETS[Math.floor(n / 3)];
  if (!set) return null;
  return { setId: set.id, variant: ORD_VAR[n % 3] };
}

function armorBuildCode() {
  return SLOT_ORDER.map(function (k) {
    var b = armorBuild[k];
    return b ? armorPieceToken(b.setId, b.variant) : '00';
  }).join('');
}

function armorCodeMsg(t, err) {
  var el = document.getElementById('armor-code-msg');
  if (!el) return;
  el.textContent = t;
  el.style.color = err ? '#d2602e' : '#4a9a5a';
  clearTimeout(armorCodeMsg._t);
  armorCodeMsg._t = setTimeout(function () {
    var e = document.getElementById('armor-code-msg'); if (e) e.textContent = '';
  }, 1900);
}

function armorApplyCode(raw) {
  if (!raw || !raw.trim()) { armorCodeMsg('Paste a code first', true); return; }
  var body = raw.trim().toUpperCase().replace(/^MHW-/, '').replace(/\s+/g, '');
  if (body.length !== SLOT_ORDER.length * 2) { armorCodeMsg('Invalid code', true); return; }
  var next = {}, ok = true, count = 0;
  for (var i = 0; i < SLOT_ORDER.length; i++) {
    var kind = SLOT_ORDER[i];
    var tok = body.substr(i * 2, 2);
    if (tok === '00') continue;
    var dec = armorTokenDecode(tok);
    if (!dec || !armorPieceFor(dec.setId, dec.variant, kind)) { ok = false; continue; }
    next[kind] = { setId: dec.setId, variant: dec.variant };
    count++;
  }
  if (!ok) { armorCodeMsg('Some pieces not recognised', true); return; }
  armorBuild = next;
  armorSaveBuild(); armorRenderBuild(); armorRender();
  armorCodeMsg('Loaded ' + count + ' piece' + (count === 1 ? '' : 's'), false);
}

function armorCopyCode() {
  var code = armorBuildCode();
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code);
    } else {
      var inp = document.getElementById('armor-code-input');
      if (inp) { inp.select(); document.execCommand('copy'); }
    }
    armorCodeMsg('Copied!', false);
  } catch (e) { armorCodeMsg('Copy failed', true); }
}

function armorCodeBar() {
  var code = armorBuildCode();
  return '<div class="armorb-codebar">' +
    '<span class="armorb-code-label">Build code</span>' +
    '<input id="armor-code-input" class="armorb-code-input" value="' + code + '" placeholder="Paste a build code to load…" spellcheck="false" autocomplete="off">' +
    '<button class="armorb-code-btn" onclick="armorCopyCode()">Copy</button>' +
    '<button class="armorb-code-btn apply" onclick="armorApplyCode(document.getElementById(\'armor-code-input\').value)">Load</button>' +
    '<span class="armorb-code-msg" id="armor-code-msg"></span>' +
    '</div>';
}
function armorEquipFullSet(setId, variant) {
  SLOT_ORDER.forEach(function (k) { if (armorPieceFor(setId, variant, k)) armorBuild[k] = { setId: setId, variant: variant }; });
  armorSaveBuild(); armorRenderBuild(); armorRender();
}

function armorRenderBuild() {
  var host = document.getElementById('armor-build');
  if (!host) return;
  var equipped = [];
  SLOT_ORDER.forEach(function (k) {
    var b = armorBuild[k]; if (!b) return;
    var p = armorPieceFor(b.setId, b.variant, k);
    if (p) equipped.push({ kind: k, set: armorFindSet(b.setId), variant: b.variant, piece: p });
  });

  var slotCards = SLOT_ORDER.map(function (k) {
    var e = null;
    for (var i = 0; i < equipped.length; i++) if (equipped[i].kind === k) { e = equipped[i]; break; }
    if (!e) {
      return '<div class="armorb-slot empty">' +
        '<div class="armorb-slot-ic">' + armorSlotIcon(k) + '</div>' +
        '<div class="armorb-slot-kind">' + k + '</div>' +
        '<div class="armorb-slot-empty">— empty —</div></div>';
    }
    return '<div class="armorb-slot filled">' +
      '<button class="armorb-x" title="Remove" onclick="armorUnequip(\'' + k + '\')">✕</button>' +
      '<div class="armorb-slot-ic">' + armorSlotIcon(k, e.set.rarity) + '</div>' +
      '<div class="armorb-slot-kind">' + k + ' · ' + e.set.set + ' ' + e.variant + '</div>' +
      '<div class="armorb-slot-name">' + e.piece.name + '</div></div>';
  }).join('');

  if (!equipped.length) {
    host.innerHTML =
      '<div class="armorb-card"><div class="armorb-head">' +
        '<span class="armorb-title">⚒ Your Build</span><span class="armorb-count">0 / 5</span></div>' +
        '<div class="armorb-slots">' + slotCards + '</div>' +
        '<div class="armorb-hint">Tap <b>+ Equip</b> on any piece below to add it here. Mix pieces from different sets — skills, slots and set/group thresholds tally automatically.</div>' +
        armorCodeBar() + '</div>';
    return;
  }

  var skillTotals = {}, order = [];
  equipped.forEach(function (e) {
    e.piece.skills.forEach(function (sk) {
      if (!(sk[0] in skillTotals)) { skillTotals[sk[0]] = 0; order.push(sk[0]); }
      skillTotals[sk[0]] += (sk[1] || 0);
    });
  });
  order.sort(function (a, b) { return skillTotals[b] - skillTotals[a]; });
  var skillHtml = order.map(function (n) {
    var max = armorSkillMax(n);
    var cur = skillTotals[n];
    var over = max && cur > max;
    var maxed = max && cur === max;
    var lvTxt = max ? (cur + '/' + max) : String(cur);
    var cls = over ? ' over' : (maxed ? ' maxed' : '');
    return '<span class="armorb-skill' + cls + '">' + n +
      '<span class="armorb-skill-lv">' + lvTxt + '</span></span>';
  }).join('');

  var slotCount = { 1: 0, 2: 0, 3: 0 };
  equipped.forEach(function (e) { e.piece.slots.forEach(function (lv) { if (lv) slotCount[lv]++; }); });
  var totalSlots = slotCount[1] + slotCount[2] + slotCount[3];
  var slotSummary = totalSlots
    ? [3,2,1].filter(function (lv) { return slotCount[lv]; }).map(function (lv) {
        return '<span class="armorb-slotpill s' + lv + '">' + SLOT_GLYPH[lv] + ' ×' + slotCount[lv] + '</span>';
      }).join('')
    : '<span class="armorb-none">no slots</span>';

  var setCounts = {}, setOrder = [], setMeta = {}, groupCounts = {};
  equipped.forEach(function (e) {
    var bn = e.set.bonus.name;
    if (!(bn in setCounts)) { setCounts[bn] = 0; setOrder.push(bn); setMeta[bn] = e.set.bonus; }
    setCounts[bn]++;
    var vr = e.set.variants[e.variant];
    var g = (e.piece && e.piece.group) || (vr && vr.group);
    if (g) groupCounts[g.name] = (groupCounts[g.name] || 0) + 1;
  });

  function bonusRows(tiers, cnt) {
    return tiers.map(function (t) {
      var on = cnt >= t[1];
      return '<div class="armorb-bonus-row ' + (on ? 'on' : 'off') + '">' +
        '<span class="armorb-bonus-tick">' + (on ? '✓' : '○') + '</span>' +
        '<span class="armorb-bonus-skill">' + t[0] + '</span>' +
        '<span class="armorb-bonus-req">' + cnt + '/' + t[1] + '</span></div>';
    }).join('');
  }
  var bonusBlocks = [];
  setOrder.forEach(function (bn) {
    var bonus = setMeta[bn];
    var cnt = setCounts[bn];
    var anyOn = bonus.tiers.some(function (t) { return cnt >= t[1]; });
    bonusBlocks.push('<div class="armorb-bonus set ' + (anyOn ? 'live' : '') + '">' +
      '<div class="armorb-bonus-h">⚔ ' + bonus.name + '</div>' + bonusRows(bonus.tiers, cnt) + '</div>');
  });
  Object.keys(groupCounts).forEach(function (gname) {
    var cnt = groupCounts[gname];
    var tiers = armorGroupTiers(gname); if (!tiers) return;
    var anyOn = tiers.some(function (t) { return cnt >= t[1]; });
    bonusBlocks.push('<div class="armorb-bonus group ' + (anyOn ? 'live' : '') + '">' +
      '<div class="armorb-bonus-h">👥 ' + gname + '</div>' + bonusRows(tiers, cnt) + '</div>');
  });

  host.innerHTML =
    '<div class="armorb-card">' +
      '<div class="armorb-head"><span class="armorb-title">⚒ Your Build</span>' +
        '<span class="armorb-count">' + equipped.length + ' / 5</span>' +
        '<span class="armorb-headcode" title="Build code — tap to copy" onclick="armorCopyCode()">' + armorBuildCode() + '</span>' +
        '<button class="armorb-clear" onclick="armorClearBuild()">Clear</button></div>' +
      '<div class="armorb-slots">' + slotCards + '</div>' +
      '<div class="armorb-totals">' +
        '<div class="armorb-tot-block"><div class="armorb-tot-h">Skills</div>' +
          '<div class="armorb-skills">' + (skillHtml || '<span class="armorb-none">—</span>') + '</div></div>' +
        '<div class="armorb-tot-block"><div class="armorb-tot-h">Deco Slots <span class="armorb-tot-sub">' + totalSlots + ' total</span></div>' +
          '<div class="armorb-slotpills">' + slotSummary + '</div></div>' +
      '</div>' +
      (bonusBlocks.length ? '<div class="armorb-bonuses">' + bonusBlocks.join('') + '</div>' : '') +
      armorCodeBar() +
    '</div>';
}

function armorSetVariant(id, v) {
  armorActiveVariant[id] = v;
  armorRender();
}

function armorSearch(v) {
  armorSearchTerm = (v || '').trim().toLowerCase();
  armorRender();
}

function armorSetSlotFilter(v) {
  armorSlotFilter = v || '';
  armorRender();
}

function armorSlotCells(slots) {
  var html = '<span class="armor-slots">';
  for (var i = 0; i < 3; i++) {
    var lv = slots[i] || 0;
    html += '<span class="armor-slot s' + lv + '">' + SLOT_GLYPH[lv] + '</span>';
  }
  return html + '</span>';
}

function armorSkillChips(skills, group, setBonus) {
  var chips = (skills || []).map(function (sk) {
    var lv = sk[1] ? '<span class="armor-skill-lv">' + sk[1] + '</span>' : '';
    return '<span class="armor-skill">' + sk[0] + lv + '</span>';
  });
  if (setBonus && setBonus.name) {
    chips.push('<span class="armor-skill setb" title="Set Bonus">⚔ ' + setBonus.name + '</span>');
  }
  if (group && group.name) {
    chips.push('<span class="armor-skill grp" title="Group Skill">👥 ' + group.name + '</span>');
  }
  if (!chips.length) return '<span class="armor-noskill">—</span>';
  return '<span class="armor-skills">' + chips.join('') + '</span>';
}

function armorPieceMatches(p, s, vr) {
  if (armorSlotFilter && p.slot !== armorSlotFilter) return false;
  if (!armorSearchTerm) return true;
  var hay = [s.set, s.element, s.bonus.name, p.name];
  s.bonus.tiers.forEach(function (t) { hay.push(t[0]); });
  var g = p.group || (vr && vr.group);
  if (g) hay.push(g.name);
  p.skills.forEach(function (sk) { hay.push(sk[0]); });
  return hay.join(' ').toLowerCase().indexOf(armorSearchTerm) !== -1;
}

function armorMatchesSet(s) {
  if (!armorSearchTerm) return true;
  var hay = [s.set, s.element, s.bonus.name];
  ['α', 'β', 'γ'].forEach(function (v) {
    var vr = s.variants[v]; if (!vr) return;
    if (vr.group) hay.push(vr.group.name);
    vr.pieces.forEach(function (p) {
      hay.push(p.name);
      p.skills.forEach(function (sk) { hay.push(sk[0]); });
    });
    vr.bonus && vr.bonus;
  });
  s.bonus.tiers.forEach(function (t) { hay.push(t[0]); });
  return hay.join(' ').toLowerCase().indexOf(armorSearchTerm) !== -1;
}

function armorTierRows(tiers) {
  return tiers.map(function (t) {
    return '<div class="armor-bonus-row"><span class="armor-bonus-skill">' + t[0] +
      '</span><span class="armor-bonus-req">' + t[1] + ' pc</span></div>';
  }).join('');
}

function armorRender() {
  var host = document.getElementById('armor-content');
  if (!host) return;
  var sets = ARMOR_SETS.filter(armorMatchesSet);
  if (!sets.length) {
    host.innerHTML = '<div class="craft-empty">No armor sets match “' + armorSearchTerm + '”.</div>';
    return;
  }
  sets = sets.slice().sort(function (a, b) { return (b.rarity || 0) - (a.rarity || 0); });
  var cards = [];
  sets.forEach(function (s) {
    ['α', 'β', 'γ'].forEach(function (v) {
      var vr = s.variants[v]; if (!vr) return;
      var pieces = vr.pieces.filter(function (p) { return armorPieceMatches(p, s, vr); });
      if (!pieces.length) return;
      var rows = pieces.map(function (p) {
        var eq = armorBuild[p.slot];
        var isOn = eq && eq.setId === s.id && eq.variant === v;
        return '<tr class="armor-piece' + (isOn ? ' equipped' : '') + '">' +
          '<td class="armor-pc-slot"><div class="armor-pc-cellflex">' + armorSlotIcon(p.slot, s.rarity) +
          '<span class="armor-pc-name">' + p.name + '</span></div></td>' +
          '<td class="armor-pc-slots">' + armorSlotCells(p.slots) + '</td>' +
          '<td class="armor-pc-skills">' + armorSkillChips(p.skills, p.group || vr.group, s.bonus) + '</td>' +
          '<td class="armor-pc-eq">' +
            (isOn
              ? '<button class="armor-eqbtn on" title="Remove" onclick="armorUnequip(\'' + p.slot + '\')">✓</button>'
              : '<button class="armor-eqbtn" title="Equip" onclick="armorEquip(\'' + s.id + '\',\'' + v + '\',\'' + p.slot + '\')">+</button>') +
          '</td></tr>';
      }).join('');

      cards.push('<div class="armor-set">' +
        '<div class="armor-set-head">' +
          '<div class="armor-set-titles">' +
            '<div class="armor-set-name">' + s.set + ' ' + v + armorRarityBadge(s.rarity) + (s.verified ? '<span class="armor-verif" title="Per-piece data verified against game8.co">✓ Verified</span>' : '') + '</div>' +
            '<div class="armor-set-el"><span class="armor-el-dot el-' + s.element.toLowerCase() + '"></span>' + s.element + '</div>' +
          '</div>' +
          '<button class="armor-fullbtn" onclick="armorEquipFullSet(\'' + s.id + '\',\'' + v + '\')">Equip set</button>' +
        '</div>' +
        '<table class="armor-tbl"><colgroup><col class="ac-pc"><col class="ac-slots"><col class="ac-skills"><col class="ac-eq"></colgroup><tbody>' + rows + '</tbody></table>' +
      '</div>');
    });
  });
  host.innerHTML = cards.join('');
}

function armorInjectCss() {
  if (document.getElementById('armor-css')) return;
  var css = document.createElement('style');
  css.id = 'armor-css';
  css.textContent = [
    '#section-armor { padding-bottom: 4rem; }',
    '.armor-set { background: var(--card); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; margin: 0 0.8rem 0.8rem; }',
    '.armor-set-head { display: flex; gap: 0.6rem; align-items: center; padding: 0.45rem 0.7rem; background: var(--surface); border-bottom: 1px solid var(--border); }',
    '.armor-set-titles { min-width: 0; flex: 1; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }',
    '.armor-set-name { font-family: "Cinzel", serif; font-weight: 800; font-size: 0.64rem; color: var(--gold-light); display: flex; align-items: baseline; gap: 0.35rem; }',
    '.armor-set-rank { font-size: 0.5rem; color: var(--text-muted); border: 1px solid var(--border); border-radius: 999px; padding: 0.02rem 0.34rem; }',
    '.armor-verif { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.38rem; letter-spacing: 0.03em; color: #4a9a5a; border: 1px solid #4a9a5a66; background: rgba(74,154,90,0.1); border-radius: 999px; padding: 0.04rem 0.34rem; align-self: center; }',
    '.armor-rar { display: inline-flex; align-items: center; gap: 0.2rem; font-family: "Cinzel", serif; font-weight: 800; font-size: 0.4rem; letter-spacing: 0.02em; border: 1px solid; border-radius: 999px; padding: 0.04rem 0.36rem; align-self: center; }',
    '.armor-rar-dot { width: 0.32rem; height: 0.32rem; border-radius: 999px; flex-shrink: 0; }',
    '.armor-set-blurb { font-family: "Crimson Pro", serif; font-size: 0.48rem; line-height: 1.4; color: var(--text-muted); margin-top: 0.2rem; text-wrap: pretty; }',
    '.armor-vtoggle { display: flex; gap: 0.25rem; flex-shrink: 0; }',
    '.armor-vbtn { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.55rem; width: 1.5rem; height: 1.5rem; cursor: pointer; color: var(--text-muted); background: var(--card); border: 1px solid var(--border); border-radius: 6px; transition: all 0.12s; }',
    '.armor-vbtn.active { color: #fff; background: var(--gold-light); border-color: var(--gold-light); }',
    '.armor-vbtn:disabled { opacity: 0.35; cursor: not-allowed; }',
    '.armor-set-el { display: inline-flex; align-items: center; gap: 0.3rem; font-family: "Cinzel", serif; font-weight: 700; font-size: 0.4rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); padding: 0; }',
    '.armor-el-dot { width: 0.34rem; height: 0.34rem; border-radius: 999px; background: var(--gold-light); }',
    '.el-thunder { background: #d8a92a; } .el-dragon { background: #7a5bb0; } .el-fire { background: #d2602e; } .el-water { background: #2e84c2; } .el-ice { background: #4db0c8; }',
    '.armor-tbl { width: 100%; border-collapse: collapse; margin-top: 0.4rem; table-layout: fixed; }',
    '.armor-tbl col.ac-pc { width: 7rem; } .armor-tbl col.ac-slots { width: 2.7rem; } .armor-tbl col.ac-eq { width: 1.7rem; }',
    '.armor-tbl th { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.4rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); text-align: left; padding: 0.3rem 0.5rem; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: var(--card); }',
    '.armor-th-slots { width: 3.4rem; text-align: center; }',
    '.armor-piece td { padding: 0.12rem 0.4rem; border-bottom: 1px solid var(--border); vertical-align: middle; }',
    '.armor-piece:last-child td { border-bottom: none; }',
    '.armor-pc-slot { width: 7rem; }',
    '.armor-pc-cellflex { display: flex; align-items: center; gap: 0.22rem; min-width: 0; }',
    '.armor-pc-ic { font-size: 0.5rem; flex-shrink: 0; }',
    '.armor-pc-ic-mask { display: inline-block; width: 0.72rem; height: 0.72rem; flex-shrink: 0; -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-position: center; mask-position: center; -webkit-mask-size: contain; mask-size: contain; }',
    '.armor-pc-ic-img { width: 0.6rem; height: 0.6rem; object-fit: contain; flex-shrink: 0; filter: brightness(1.08); }',
    '.armor-pc-meta { display: flex; flex-direction: column; min-width: 0; }',
    '.armor-pc-kind { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.38rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); }',
    '.armor-pc-name { font-family: "Crimson Pro", serif; font-size: 0.48rem; color: var(--text); line-height: 1.15; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
    '.armor-pc-slots { text-align: center; }',
    '.armor-slots { display: inline-flex; gap: 0.12rem; justify-content: center; }',
    '.armor-slot { font-size: 0.46rem; line-height: 1; width: 0.6rem; text-align: center; }',
    '.armor-slot.s0 { color: var(--border); }',
    '.armor-slot.s1 { color: #6a7a6a; } .armor-slot.s2 { color: #3a78a8; } .armor-slot.s3 { color: #b8881a; }',
    '.armor-skills { display: flex; flex-wrap: wrap; gap: 0.14rem; align-items: center; }',
    '.armor-pc-skills { width: auto; }',
    '.armor-skill { display: inline-flex; align-items: center; gap: 0.16rem; white-space: nowrap; font-family: "Crimson Pro", serif; font-size: 0.42rem; color: var(--text); background: var(--surface); border: 1px solid var(--border); border-radius: 999px; padding: 0.02rem 0.24rem 0.02rem 0.32rem; }',
    '.armor-skill-lv { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.36rem; color: #fff; background: var(--gold-light); border-radius: 999px; min-width: 0.62rem; text-align: center; padding: 0 0.08rem; }',
    '.armor-skill.grp { color: #9a7bc8; border-color: #7a5bb066; background: rgba(122,91,176,0.12); }',
    '.armor-skill.setb { color: #d8a94a; border-color: #c8a04066; background: rgba(184,136,26,0.12); }',
    '.armor-noskill { color: var(--text-muted); }',
    '.armor-bonuses { display: grid; grid-template-columns: 1fr 1fr; gap: 0.45rem; padding: 0.5rem 0.7rem 0.7rem; }',
    '.armor-bonus { border: 1px solid var(--border); border-radius: 8px; padding: 0.4rem 0.5rem; background: var(--surface); }',
    '.armor-bonus.set { border-color: #c8a04055; background: rgba(184,136,26,0.07); }',
    '.armor-bonus.group { border-color: #7a5bb055; background: rgba(122,91,176,0.07); }',
    '.armor-bonus-h { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.44rem; color: var(--text); margin-bottom: 0.3rem; text-wrap: pretty; line-height: 1.25; }',
    '.armor-bonus-row { display: flex; align-items: center; justify-content: space-between; gap: 0.4rem; font-family: "Crimson Pro", serif; font-size: 0.46rem; color: var(--text); padding: 0.12rem 0; }',
    '.armor-bonus-skill { min-width: 0; }',
    '.armor-bonus-req { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.38rem; color: var(--text-muted); background: var(--card); border: 1px solid var(--border); border-radius: 999px; padding: 0.04rem 0.34rem; flex-shrink: 0; }',
    '.armor-foot { font-family: "Crimson Pro", serif; font-size: 0.44rem; color: var(--text-muted); text-align: center; line-height: 1.45; margin: 0.3rem 0.9rem 0; text-wrap: pretty; }',
    '.armor-search-row { display: flex; gap: 0.4rem; align-items: stretch; }',
    '.armor-search-row .g-search-input { flex: 1; min-width: 0; }',
    '.armor-slot-filter { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.44rem; color: var(--text); background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 0 1.4rem 0 0.6rem; cursor: pointer; flex-shrink: 0; -webkit-appearance: none; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23b8881a\' d=\'M3 4.5L6 7.5L9 4.5\'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.5rem center; background-size: 0.7rem; }',
    '.armor-slot-filter:focus { outline: none; border-color: var(--gold-light); }',
    '.armor-piece.equipped { background: rgba(184,136,26,0.07); }',
    '.armor-pc-eq { text-align: right; }',
    '.armor-eqbtn { font-family: "Cinzel", serif; font-weight: 800; font-size: 0.5rem; line-height: 1; cursor: pointer; color: var(--gold-light); background: var(--surface); border: 1px solid var(--gold-deep, #8a6a1e); border-radius: 5px; width: 1.2rem; height: 1.2rem; padding: 0; transition: all 0.12s; }',
    '.armor-eqbtn:hover { color: #fff; background: var(--gold-light); border-color: var(--gold-light); }',
    '.armor-eqbtn.on { color: #fff; background: #4a9a5a; border-color: #4a9a5a; }',
    '.armor-fullbtn { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.42rem; cursor: pointer; color: var(--text-muted); background: var(--card); border: 1px solid var(--border); border-radius: 6px; padding: 0.22rem 0.5rem; transition: all 0.12s; white-space: nowrap; margin-top: 0.3rem; }',
    '.armor-fullbtn:hover { color: var(--gold-light); border-color: var(--gold-light); }',
    '.armor-set-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 0.1rem; flex-shrink: 0; }',
    /* ── build panel ── */
    '#armor-build { margin: 0 0.8rem 0.7rem; }',
    '.armorb-card { background: var(--card); border: 1px solid var(--gold-deep, #8a6a1e); border-radius: 12px; overflow: hidden; box-shadow: 0 2px 14px rgba(0,0,0,0.18); }',
    '.armorb-head { display: flex; align-items: center; gap: 0.5rem; padding: 0.55rem 0.7rem; background: linear-gradient(90deg, rgba(184,136,26,0.16), transparent); border-bottom: 1px solid var(--border); }',
    '.armorb-title { font-family: "Cinzel", serif; font-weight: 800; font-size: 0.6rem; color: var(--gold-light); letter-spacing: 0.03em; }',
    '.armorb-count { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.44rem; color: var(--text-muted); border: 1px solid var(--border); border-radius: 999px; padding: 0.06rem 0.4rem; }',
    '.armorb-headcode { font-family: "DM Mono", "Courier New", monospace; font-size: 0.42rem; letter-spacing: 0.04em; color: var(--text-muted); background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 0.12rem 0.4rem; cursor: pointer; transition: all 0.12s; white-space: nowrap; }',
    '.armorb-headcode:hover { color: var(--gold-light); border-color: var(--gold-light); }',
    '.armorb-clear { margin-left: auto; font-family: "Cinzel", serif; font-weight: 700; font-size: 0.44rem; cursor: pointer; color: var(--text-muted); background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 0.18rem 0.5rem; transition: all 0.12s; }',
    '.armorb-clear:hover { color: #d2602e; border-color: #d2602e; }',
    '.armorb-codebar { display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap; padding: 0.5rem 0.7rem 0.65rem; border-top: 1px solid var(--border); margin-top: 0.1rem; }',
    '.armorb-code-label { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.4rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); }',
    '.armorb-code-input { flex: 1; min-width: 6rem; font-family: "DM Mono", "Courier New", monospace; font-size: 0.46rem; color: var(--text); background: var(--surface); border: 1px solid var(--border); border-radius: 7px; padding: 0.26rem 0.45rem; }',
    '.armorb-code-input:focus { outline: none; border-color: var(--gold-light); }',
    '.armorb-code-btn { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.42rem; cursor: pointer; color: var(--text); background: var(--card); border: 1px solid var(--border); border-radius: 7px; padding: 0.26rem 0.55rem; transition: all 0.12s; }',
    '.armorb-code-btn:hover { color: var(--gold-light); border-color: var(--gold-light); }',
    '.armorb-code-btn.apply { color: #fff; background: var(--gold-light); border-color: var(--gold-light); }',
    '.armorb-code-btn.apply:hover { filter: brightness(1.08); }',
    '.armorb-code-msg { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.42rem; min-width: 0; }',
    '.armorb-slots { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.4rem; padding: 0.6rem 0.7rem; }',
    '.armorb-slot { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.18rem; padding: 0.35rem 0.25rem; border: 1px solid var(--border); border-radius: 9px; background: var(--surface); position: relative; min-height: 3.6rem; justify-content: center; }',
    '.armorb-slot.filled { border-color: #b8881a66; background: rgba(184,136,26,0.08); }',
    '.armorb-slot.empty { border-style: dashed; opacity: 0.7; }',
    '.armorb-slot-ic { display: flex; }',
    '.armorb-slot-ic .armor-pc-ic-img { width: 0.8rem; height: 0.8rem; }',
    '.armorb-slot-ic .armor-pc-ic-mask { width: 0.95rem; height: 0.95rem; }',
    '.armorb-slot-ic .armor-pc-ic { font-size: 0.58rem; }',
    '.armorb-slot-kind { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.34rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); line-height: 1.2; }',
    '.armorb-slot-name { font-family: "Crimson Pro", serif; font-size: 0.44rem; color: var(--text); line-height: 1.15; }',
    '.armorb-slot-empty { font-family: "Crimson Pro", serif; font-size: 0.42rem; color: var(--text-muted); font-style: italic; }',
    '.armorb-x { position: absolute; top: 0.18rem; right: 0.2rem; width: 0.85rem; height: 0.85rem; line-height: 1; font-size: 0.4rem; cursor: pointer; color: var(--text-muted); background: var(--card); border: 1px solid var(--border); border-radius: 50%; padding: 0; display: flex; align-items: center; justify-content: center; }',
    '.armorb-x:hover { color: #d2602e; border-color: #d2602e; }',
    '.armorb-hint, .armorb-none { font-family: "Crimson Pro", serif; font-size: 0.46rem; color: var(--text-muted); }',
    '.armorb-hint { padding: 0 0.7rem 0.7rem; text-wrap: pretty; line-height: 1.4; }',
    '.armorb-totals { display: grid; grid-template-columns: 1.4fr 1fr; gap: 0.5rem; padding: 0 0.7rem 0.6rem; }',
    '.armorb-tot-block { border: 1px solid var(--border); border-radius: 9px; padding: 0.45rem 0.5rem; background: var(--surface); }',
    '.armorb-tot-h { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.42rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 0.35rem; }',
    '.armorb-tot-sub { color: var(--gold-light); margin-left: 0.2rem; }',
    '.armorb-skills { display: flex; flex-wrap: wrap; gap: 0.25rem; }',
    '.armorb-skill { display: inline-flex; align-items: center; gap: 0.25rem; font-family: "Crimson Pro", serif; font-size: 0.48rem; color: var(--text); background: var(--card); border: 1px solid var(--border); border-radius: 999px; padding: 0.08rem 0.32rem 0.08rem 0.42rem; }',
    '.armorb-skill-lv { font-family: "Cinzel", serif; font-weight: 800; font-size: 0.42rem; color: #fff; background: var(--gold-light); border-radius: 999px; min-width: 0.78rem; text-align: center; padding: 0 0.12rem; }',
    '.armorb-skill.maxed { border-color: var(--gold-light); }',
    '.armorb-skill.over { color: #fff; background: #c0392b; border-color: #c0392b; }',
    '.armorb-skill.over .armorb-skill-lv { color: #c0392b; background: #fff; }',
    '.armorb-slotpills { display: flex; flex-wrap: wrap; gap: 0.3rem; }',
    '.armorb-slotpill { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.5rem; color: var(--text); border: 1px solid var(--border); border-radius: 7px; padding: 0.1rem 0.36rem; background: var(--card); }',
    '.armorb-slotpill.s1 { color: #6a7a6a; } .armorb-slotpill.s2 { color: #3a78a8; } .armorb-slotpill.s3 { color: #b8881a; }',
    '.armorb-bonuses { display: flex; flex-wrap: wrap; gap: 0.45rem; padding: 0 0.7rem 0.7rem; }',
    '.armorb-bonus { flex: 1 1 8rem; border: 1px solid var(--border); border-radius: 9px; padding: 0.4rem 0.5rem; background: var(--surface); opacity: 0.62; }',
    '.armorb-bonus.live { opacity: 1; }',
    '.armorb-bonus.set.live { border-color: #c8a04088; background: rgba(184,136,26,0.1); }',
    '.armorb-bonus.group.live { border-color: #7a5bb088; background: rgba(122,91,176,0.1); }',
    '.armorb-bonus-h { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.44rem; color: var(--text); margin-bottom: 0.28rem; text-wrap: pretty; line-height: 1.2; }',
    '.armorb-bonus-row { display: flex; align-items: center; gap: 0.35rem; font-family: "Crimson Pro", serif; font-size: 0.46rem; padding: 0.1rem 0; }',
    '.armorb-bonus-row.off { color: var(--text-muted); }',
    '.armorb-bonus-tick { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.46rem; }',
    '.armorb-bonus-row.on .armorb-bonus-tick { color: #4a9a5a; }',
    '.armorb-bonus-skill { flex: 1; min-width: 0; }',
    '.armorb-bonus-req { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.4rem; color: var(--text-muted); }',
    '.armorb-bonus-row.on .armorb-bonus-req { color: var(--gold-light); }',
    '@media (max-width: 360px) { .armor-bonuses { grid-template-columns: 1fr; } .armorb-totals { grid-template-columns: 1fr; } }'
  ].join('\n');
  document.head.appendChild(css);
}
