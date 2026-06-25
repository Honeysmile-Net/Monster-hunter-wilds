/* ════════════════════════════════════════════════════════
   ARMOR TAB — High Rank α / β sets
   Per-piece skills + decoration slots + set bonus / group skill.
   Slot notation matches the game: ① / ② / ③ = lvl-1/2/3 slot, — = none.
   Data sourced from game8.co set pages (verified per-piece).
   ════════════════════════════════════════════════════════ */

/* Build DECO_BY_ID index from DECORATIONS if available */
var DECO_BY_ID = {};
if (typeof DECORATIONS !== 'undefined' && Array.isArray(DECORATIONS)) {
  DECORATIONS.forEach(function(deco) {
    if (deco.id) DECO_BY_ID[deco.id] = deco;
  });
}

/* Build CHARM_BY_NAME index from CHARMS (Craftable Charms only) if available */
var CHARM_BY_NAME = {};
if (typeof CHARMS !== 'undefined' && Array.isArray(CHARMS)) {
  CHARMS.forEach(function(c) { if (c.name) CHARM_BY_NAME[c.name] = c; });
}

/* ── Amulet (custom charm) roll data — possible deco-slot combos per rarity.
   Source: user-provided [MHWilds] Amulet Tables.xlsx (Amulet Combos sheet).
   R8 uses a weapon-type size-1 slot (W1) per the sheet's Rarity 8 Slots table. ── */
var AMULET_SLOTS = {
  5: ['[1,1]', '[2,0]', '[2,1]', '[3,0]'],
  6: ['[1,0]', '[1,1]', '[2,0]', '[2,1]'],
  7: ['[1,0]', '[1,1]', '[2,0]', '[3,0]'],
  8: ['[W1,0]', '[W1,1]', '[W1,1,1]']
};

/* ── Amulet skill-roll data (Source: [MHWilds] Amulet Tables.xlsx).
   Per rarity, a list of possible ROLL ROWS. Each row = a skill-GROUP config
   (up to 3 group numbers; the rolled skill in each position comes from that
   group at the group's fixed level) PAIRED with the deco-slot combos that row
   can roll. Skills and slots are mostly independent, BUT at R7 one config
   ([G2,G1,G8]) is the only one that can roll the [3,0] slot and cannot roll
   [1,0] — so picking that slot constrains the skills and vice versa.
   R7 & R8 share the same skill configs; they differ in slot combos. ── */
var R7_COMMON = ['[1,0]', '[1,1]', '[2,0]'];
var R8_COMMON = ['[W1,0]', '[W1,1]', '[W1,1,1]'];
var AMULET_ROWS = {
  5: [[1,6,6],[1,7],[1,8,6],[1,8,8],[1,9],[1,10]].map(function (g) { return { g: g, slots: ['[1,1]','[2,0]','[2,1]','[3,0]'] }; }),
  6: [[1,1,7],[1,1,10],[2,6,6],[2,8,6],[2,8,8],[2,9],[2,10]].map(function (g) { return { g: g, slots: ['[1,0]','[1,1]','[2,0]','[2,1]'] }; }),
  7: [
    { g: [2,1,7],  slots: R7_COMMON },
    { g: [2,1,8],  slots: ['[1,1]','[2,0]','[3,0]'] }, // only config that rolls [3,0]; cannot roll [1,0]
    { g: [2,1,10], slots: R7_COMMON },
    { g: [3,6,5],  slots: R7_COMMON },
    { g: [3,7],    slots: R7_COMMON },
    { g: [3,8,5],  slots: R7_COMMON },
    { g: [3,10],   slots: R7_COMMON },
    { g: [4,1,1],  slots: R7_COMMON }
  ],
  8: [[2,1,7],[2,1,8],[2,1,10],[3,6,5],[3,7],[3,8,5],[3,10],[4,1,1]].map(function (g) { return { g: g, slots: R8_COMMON }; })
};
/* Each group → list of [skillName, fixedLevel] the amulet can roll from it. */
var SKILL_GROUPS = {
  1: [["Artillery",1],["Attack Boost",1],["Ballistics",1],["Blast Attack",1],["Bludgeoner",1],["Charge Master",1],["Critical Draw",1],["Critical Element",1],["Critical Eye",1],["Critical Status",1],["Dragon Attack",1],["Fire Attack",1],["Focus",1],["Guard",1],["Guard Up",1],["Handicraft",1],["Horn Maestro",1],["Ice Attack",1],["Load Shells",1],["Mind's Eye",1],["Offensive Guard",1],["Opening Shot",1],["Paralysis Attack",1],["Poison Attack",1],["Power Prolonger",1],["Protective Polish",1],["Punishing Draw",1],["Rapid Morph",1],["Razor Sharp",1],["Sleep Attack",1],["Slugger",1],["Special Ammo Boost",1],["Speed Sharpening",1],["Stamina Thief",1],["Tetrad Shot",1],["Thunder Attack",1],["Water Attack",1]],
  2: [["Airborne",1],["Artillery",2],["Attack Boost",2],["Ballistics",2],["Blast Attack",2],["Blast Functionality",1],["Bludgeoner",2],["Charge Master",2],["Charge Up",1],["Critical Draw",2],["Critical Element",2],["Critical Eye",2],["Critical Status",2],["Dragon Attack",2],["Exhaust Functionality",1],["Fire Attack",2],["Focus",2],["Guard",2],["Guard Up",2],["Handicraft",2],["Horn Maestro",2],["Ice Attack",2],["Load Shells",2],["Mind's Eye",2],["Offensive Guard",2],["Opening Shot",2],["Paralysis Attack",2],["Poison Attack",2],["Poison Duration Up",1],["Poison Functionality",1],["Power Prolonger",2],["Protective Polish",2],["Punishing Draw",2],["Rapid Morph",2],["Razor Sharp",2],["Sleep Attack",2],["Slugger",2],["Special Ammo Boost",2],["Speed Sharpening",2],["Stamina Thief",2],["Tetrad Shot",2],["Thunder Attack",2],["Water Attack",2]],
  3: [["Artillery",3],["Attack Boost",3],["Ballistics",3],["Blast Attack",3],["Bludgeoner",3],["Charge Master",3],["Critical Draw",3],["Critical Element",3],["Critical Eye",3],["Critical Status",3],["Dragon Attack",3],["Fire Attack",3],["Focus",3],["Guard",3],["Guard Up",3],["Handicraft",3],["Ice Attack",3],["Master's Touch",1],["Mind's Eye",3],["Normal Shots",1],["Offensive Guard",3],["Opening Shot",3],["Para Functionality",1],["Paralysis Attack",3],["Piercing Shots",1],["Poison Attack",3],["Power Prolonger",3],["Protective Polish",3],["Punishing Draw",3],["Rapid Fire Up",1],["Rapid Morph",3],["Razor Sharp",3],["Sleep Attack",3],["Sleep Functionality",1],["Slugger",3],["Spread/Power Shots",1],["Stamina Thief",3],["Tetrad Shot",3],["Thunder Attack",3],["Water Attack",3]],
  4: [["Attack Boost",2],["Ballistics",2],["Blast Attack",2],["Critical Boost",1],["Critical Element",2],["Critical Eye",2],["Dragon Attack",2],["Fire Attack",2],["Guard",2],["Guard Up",2],["Handicraft",2],["Ice Attack",2],["Opening Shot",2],["Paralysis Attack",2],["Poison Attack",2],["Protective Polish",2],["Razor Sharp",2],["Sleep Attack",2],["Tetrad Shot",2],["Thunder Attack",2],["Water Attack",2]],
  5: [["Adaptability",1],["Antivirus",1],["Aquatic/Oilsilt Mobility",1],["Bind Resistance",1],["Blast Resistance",1],["Bleeding Resistance",1],["Bombardier",1],["Botanist",2],["Constitution",2],["Defense Boost",2],["Divine Blessing",1],["Dragon Resistance",1],["Fire Resistance",1],["Flinch Free",1],["Free Meal",1],["Geologist",1],["Hunger Resistance",1],["Ice Resistance",1],["Intimidator",1],["Iron Skin",1],["Item Prolonger",1],["Marathon Runner",1],["Paralysis Resistance",1],["Poison Resistance",1],["Quick Sheathe",1],["Recovery Speed",1],["Recovery Up",1],["Sleep Resistance",1],["Speed Eating",1],["Stench Resistance",1],["Stun Resistance",1],["Survival Expert",1],["Thunder Resistance",1],["Tremor Resistance",1],["Water Resistance",1],["Wide-Range",2],["Windproof",1]],
  6: [["Adaptability",2],["Antivirus",2],["Aquatic/Oilsilt Mobility",2],["Bind Resistance",2],["Blast Resistance",2],["Bleeding Resistance",2],["Bombardier",2],["Botanist",3],["Constitution",3],["Defense Boost",3],["Divine Blessing",2],["Dragon Resistance",2],["Fire Resistance",2],["Flinch Free",2],["Free Meal",2],["Geologist",2],["Hunger Resistance",2],["Ice Resistance",2],["Intimidator",2],["Iron Skin",2],["Item Prolonger",2],["Marathon Runner",2],["Paralysis Resistance",2],["Poison Resistance",2],["Quick Sheathe",2],["Recovery Speed",2],["Recovery Up",2],["Sleep Resistance",2],["Speed Eating",2],["Stench Resistance",2],["Stun Resistance",2],["Survival Expert",2],["Thunder Resistance",2],["Tremor Resistance",2],["Water Resistance",2],["Wide-Range",3],["Windproof",2]],
  7: [["Antivirus",3],["Bind Resistance",3],["Blast Resistance",3],["Bleeding Resistance",3],["Bombardier",3],["Botanist",4],["Constitution",4],["Defense Boost",4],["Divine Blessing",3],["Dragon Resistance",3],["Fire Resistance",3],["Flinch Free",3],["Free Meal",3],["Geologist",3],["Hunger Resistance",3],["Ice Resistance",3],["Intimidator",3],["Iron Skin",3],["Item Prolonger",3],["Marathon Runner",3],["Paralysis Resistance",3],["Poison Resistance",3],["Quick Sheathe",3],["Recovery Speed",3],["Recovery Up",3],["Sleep Resistance",3],["Speed Eating",3],["Stun Resistance",3],["Survival Expert",3],["Thunder Resistance",3],["Tremor Resistance",3],["Water Resistance",3],["Wide-Range",4],["Windproof",3]],
  8: [["Ambush",1],["Blight Resistance",1],["Coalescence",1],["Counterstrike",1],["Earplugs",1],["Evade Extender",1],["Evade Window",2],["Heroics",2],["Maximum Might",1],["Mushroomancer",1],["Partbreaker",1],["Peak Performance",1],["Resentment",1],["Stamina Surge",1],["Tool Specialist",2]],
  9: [["Ambush",2],["Blight Resistance",2],["Coalescence",2],["Counterstrike",2],["Earplugs",2],["Evade Extender",2],["Evade Window",3],["Heroics",3],["Maximum Might",2],["Mushroomancer",2],["Partbreaker",2],["Peak Performance",2],["Resentment",2],["Stamina Surge",2],["Tool Specialist",3]],
  10: [["Adrenaline Rush",1],["Agitator",1],["Burst",1],["Convert Element",1],["Elemental Absorption",1],["Flayer",1],["Foray",1],["Latent Power",1],["Weakness Exploit",1]]
};
/* True if group g can roll exactly (name, lv). */
function amuletGroupHas(g, name, lv) {
  var arr = SKILL_GROUPS[g] || [];
  for (var i = 0; i < arr.length; i++) if (arr[i][0] === name && arr[i][1] === lv) return true;
  return false;
}
/* Can picks (array of [name,lv]) be assigned injectively to a config's groups? */
function amuletConfigSatisfies(cfg, picks) {
  if (picks.length > cfg.length) return false;
  var used = [];
  function bt(i) {
    if (i >= picks.length) return true;
    for (var j = 0; j < cfg.length; j++) {
      if (used[j]) continue;
      if (amuletGroupHas(cfg[j], picks[i][0], picks[i][1])) {
        used[j] = true;
        if (bt(i + 1)) return true;
        used[j] = false;
      }
    }
    return false;
  }
  return bt(0);
}
/* True if some roll row of this rarity can produce all of `picks`, optionally
   restricted to rows that can roll the given slot combo (''/null = any slot). */
function amuletPicksValid(rarity, picks, slot) {
  var rows = AMULET_ROWS[rarity] || [];
  for (var i = 0; i < rows.length; i++) {
    if (slot && rows[i].slots.indexOf(slot) < 0) continue;
    if (amuletConfigSatisfies(rows[i].g, picks)) return true;
  }
  return false;
}
/* Deco-slot combos still rollable given the currently picked skills. */
function amuletSlotCombos(rarity, skills) {
  var picks = (skills || []).filter(function (s) { return s && s[0]; });
  var rows = AMULET_ROWS[rarity] || [];
  var set = {}, order = AMULET_SLOTS[rarity] || [];
  rows.forEach(function (r) {
    if (amuletConfigSatisfies(r.g, picks)) r.slots.forEach(function (s) { set[s] = true; });
  });
  return order.filter(function (s) { return set[s]; });
}
/* Valid (name, level) outcomes for slot `slotIdx`, given the other filled
   skill slots AND the chosen deco-slot combo. */
function amuletSlotOptions(rarity, skills, slotIdx, slotCombo) {
  var others = (skills || []).filter(function (s, k) { return k !== slotIdx && s && s[0]; });
  var otherNames = {};
  others.forEach(function (s) { otherNames[s[0]] = true; });
  var rows = AMULET_ROWS[rarity] || [];
  var groupSet = {};
  rows.forEach(function (r) {
    if (slotCombo && r.slots.indexOf(slotCombo) < 0) return;
    r.g.forEach(function (g) { groupSet[g] = true; });
  });
  var seen = {}, out = [];
  Object.keys(groupSet).forEach(function (g) {
    (SKILL_GROUPS[g] || []).forEach(function (o) {
      var key = o[0] + '|' + o[1];
      if (seen[key] || otherNames[o[0]]) return;
      if (amuletPicksValid(rarity, others.concat([[o[0], o[1]]]), slotCombo)) { seen[key] = true; out.push({ name: o[0], level: o[1] }); }
    });
  });
  out.sort(function (a, b) { return a.name === b.name ? a.level - b.level : a.name.localeCompare(b.name); });
  return out;
}
/* Drop skills no longer rollable together at the current rarity + slot combo. */
function amuletPruneSkills(c) {
  if (!c || !c.skills) return;
  var kept = [];
  c.skills.forEach(function (s) {
    if (!s || !s[0]) return;
    if (amuletPicksValid(c.rarity, kept.concat([s]), c.slots)) kept.push(s);
  });
  c.skills = kept;
}

/* ── charm state (one charm per build: craftable OR custom amulet) ── */
function armorRawCharm() { return (typeof armorBuild !== 'undefined' && armorBuild.charm) || null; }
function armorGetCharm() { var c = armorRawCharm(); return (typeof c === 'string') ? c : ''; }
function armorCharmMode() { var c = armorRawCharm(); return (c && typeof c === 'object' && c.type === 'custom') ? 'custom' : 'craft'; }
function armorCustomCharm() { var c = armorRawCharm(); return (c && typeof c === 'object' && c.type === 'custom') ? c : null; }
function armorSetCharm(name) {
  if (name) armorBuild.charm = name; else delete armorBuild.charm;
  armorSaveBuild();
  if (typeof armorRenderBuild === 'function') armorRenderBuild();
}
function armorSetCharmIdx(i) {
  var c = (typeof CHARMS !== 'undefined') ? CHARMS[i] : null;
  armorSetCharm(c ? c.name : '');
}
function armorCharmObj() {
  var n = armorGetCharm();
  return n && CHARM_BY_NAME[n] ? CHARM_BY_NAME[n] : null;
}
function armorSetCharmMode(mode) {
  if (mode === 'custom') { armorBuild.charm = { type: 'custom', rarity: 0, slots: '' }; }
  else { delete armorBuild.charm; }
  armorSaveBuild();
  if (typeof armorRenderBuild === 'function') armorRenderBuild();
}
function armorSetCustomRarity(r) {
  var c = armorCustomCharm(); if (!c) return;
  var changed = (c.rarity !== r);
  c.rarity = r;
  if ((AMULET_SLOTS[r] || []).indexOf(c.slots) < 0) c.slots = '';
  if (changed) c.skills = []; // rarity defines what can roll — reset all picked skills (anti-cheat)
  armorSaveBuild();
  if (typeof armorRenderBuild === 'function') armorRenderBuild();
}
function armorSetCustomSlots(combo) {
  var c = armorCustomCharm(); if (!c) return;
  var old = c.slots;
  c.slots = (c.slots === combo) ? '' : combo;
  // Only at R7 do slot combos restrict skills (config [G2,G1,G8] ⇔ slot [3,0]).
  // Reset all picked skills there when the slot actually changes (anti-cheat);
  // other rarities just keep skills (slots are independent).
  if (c.rarity === 7 && c.slots !== old) c.skills = [];
  else amuletPruneSkills(c);
  if (typeof armorDecoPrune === 'function') armorDecoPrune();
  armorSaveBuild();
  if (typeof armorRenderBuild === 'function') armorRenderBuild();
}
/* ── custom charm skills (constrained to rollable group skills, up to 3) ── */
var _ALL_SKILLS_CACHE = null;
function armorAllSkills() {
  if (!_ALL_SKILLS_CACHE) {
    var set = {};
    if (typeof SKILL_MAX !== 'undefined') Object.keys(SKILL_MAX).forEach(function (k) { set[k] = 1; });
    if (typeof SKILL_GROUPS !== 'undefined') Object.keys(SKILL_GROUPS).forEach(function (g) { SKILL_GROUPS[g].forEach(function (o) { set[o[0]] = 1; }); });
    var keys = Object.keys(set);
    if (keys.length) _ALL_SKILLS_CACHE = keys.sort();
  }
  return _ALL_SKILLS_CACHE || [];
}
function armorCustomSkills() { var c = armorCustomCharm(); return (c && c.skills) ? c.skills : []; }
function armorCanAddCustomSkill() {
  var c = armorCustomCharm();
  if (!c || !c.rarity) return false;
  var skills = (c.skills || []).filter(function (s) { return s && s[0]; });
  if (skills.length >= 3) return false;
  // can add only if some outcome exists for the next slot
  return amuletSlotOptions(c.rarity, skills, skills.length, c.slots).length > 0;
}
function armorAddCustomSkill() {
  var c = armorCustomCharm(); if (!c) return;
  if (!c.skills) c.skills = [];
  if (!armorCanAddCustomSkill()) return;
  c.skills.push(['', 0]);
  armorSaveBuild();
  if (typeof armorRenderBuild === 'function') armorRenderBuild();
}
// Set both skill name and its fixed level from a single "name|level" outcome value.
function armorSetCustomSkillOutcome(i, value) {
  var c = armorCustomCharm(); if (!c || !c.skills || !c.skills[i]) return;
  if (!value) { c.skills[i] = ['', 0]; }
  else {
    var sep = value.lastIndexOf('|');
    var nm = value.slice(0, sep);
    var lv = parseInt(value.slice(sep + 1), 10) || 1;
    c.skills[i] = [nm, lv];
  }
  armorSaveBuild();
  if (typeof armorRenderBuild === 'function') armorRenderBuild();
}
function armorRemoveCustomSkill(i) {
  var c = armorCustomCharm(); if (!c || !c.skills) return;
  c.skills.splice(i, 1);
  armorSaveBuild();
  if (typeof armorRenderBuild === 'function') armorRenderBuild();
}
// Skills contributed by the equipped charm (craftable or custom).
function armorCharmSkillContribs() {
  if (armorCharmMode() === 'custom') {
    return armorCustomSkills().filter(function (s) { return s[0]; });
  }
  var co = armorCharmObj();
  return co ? [[co.skill, co.level || 0]] : [];
}
// Parsed deco-slot defs for the custom charm: [{lv, type, w}] in slot order.
function armorCharmSlotDefs() {
  var c = armorCustomCharm();
  if (!c || !c.slots) return [];
  var toks = c.slots.replace(/[\[\]]/g, '').split(',');
  var defs = [];
  toks.forEach(function (t) {
    t = t.trim();
    if (t === '0' || t === '') return;
    if (t === 'W1') defs.push({ lv: 1, type: 'weapon', w: true });
    else defs.push({ lv: parseInt(t, 10), type: 'armor', w: false });
  });
  return defs;
}
// Render a slot combo like '[2,1]' or '[W1,1,1]' as deco-slot pips.
function armorAmuletSlotPips(combo) {
  if (!combo) return '';
  var toks = combo.replace(/[\[\]]/g, '').split(',');
  var pips = toks.map(function (t) {
    t = t.trim();
    if (t === '0' || t === '') return '';
    if (t === 'W1') return '<span class="armorb-slot-ind s1 amu-w has-deco" title="Weapon-type deco slot (size 1)">1<sup class="amu-wtag">W</sup></span>';
    var n = parseInt(t, 10);
    return '<span class="armorb-slot-ind s' + n + ' has-deco" title="Armor deco slot ' + SLOT_GLYPH[n] + '">' + SLOT_NUM[n] + '</span>';
  }).filter(Boolean).join('');
  return pips;
}

/* Decoration slot management */
function armorDecoFor(kind, idx) {
  return localStorage.getItem('armor_' + kind + '_deco_' + idx) || null;
}

function armorSetDecoFor(kind, idx, decoId) {
  if (decoId) {
    localStorage.setItem('armor_' + kind + '_deco_' + idx, decoId);
  } else {
    localStorage.removeItem('armor_' + kind + '_deco_' + idx);
  }
}

/* ── decoration <-> build-code encoding ──
   Deco slots are keyed by piece kind + slot index. The build code appends a
   'D' segment: one 3-char group per filled slot = [posChar][deco2char].
   pos = kindIndex*3 + idx over kinds [Weapon, Head, Chest, Arms, Waist, Legs]. */
var DECO_SLOT_KINDS = ['Weapon', 'Head', 'Chest', 'Arms', 'Waist', 'Legs', 'Charm'];
function armorDecoSlotMap() {
  var list = [];
  DECO_SLOT_KINDS.forEach(function (k) { for (var i = 0; i < 3; i++) list.push([k, i]); });
  return list;
}
function armorDecoIdToken(id) {
  if (typeof DECORATIONS === 'undefined') return null;
  var idx = -1;
  for (var i = 0; i < DECORATIONS.length; i++) { if (DECORATIONS[i].id === id) { idx = i; break; } }
  if (idx < 0) return null;
  var c = (idx + 1).toString(36).toUpperCase();
  return c.length < 2 ? '0' + c : c;
}
function armorDecoTokenToId(tok) {
  var n = parseInt(tok, 36);
  if (!n || isNaN(n) || typeof DECORATIONS === 'undefined') return null;
  var d = DECORATIONS[n - 1];
  return d ? d.id : null;
}
function armorDecoCodeSegment() {
  var map = armorDecoSlotMap(), out = '';
  for (var p = 0; p < map.length; p++) {
    var id = armorDecoFor(map[p][0], map[p][1]);
    if (!id) continue;
    var tok = armorDecoIdToken(id);
    if (!tok) continue;
    out += p.toString(36).toUpperCase() + tok;
  }
  return out ? 'D' + out : '';
}
function armorDecoApplySegment(seg) {
  var map = armorDecoSlotMap();
  map.forEach(function (m) { armorSetDecoFor(m[0], m[1], ''); }); // clear all first
  var body = (seg || '').replace(/^D/, '');
  for (var i = 0; i + 3 <= body.length; i += 3) {
    var p = parseInt(body.charAt(i), 36);
    var slot = map[p];
    if (!slot) continue;
    var id = armorDecoTokenToId(body.substr(i + 1, 2));
    if (id) armorSetDecoFor(slot[0], slot[1], id);
  }
}
// Clear decos for unequipped pieces or empty slots so totals + code stay accurate.
/* Transcend deco-slot logic (TU4). Only Rarity 5 & 6 gear changes:
     • Rarity 5 → every slot (incl. empty) +1 level, capped at ③.
         [2,1,0] → [3,2,1]   [1,1,1] → [2,2,2]   [0,0,0] → [1,1,1]
     • Rarity 6 → the FIRST TWO slots +1 (capped at ③); the third is unchanged.
         [2,2,1] → [3,3,1]   [3,0,0] → [3,1,0]
   A slot already at ③ stays ③ (③ is the cap). Rarity 7+/≤4 never change. */
function armorTranscendSlots(slots, rarity) {
  var s = [ (slots && slots[0]) || 0, (slots && slots[1]) || 0, (slots && slots[2]) || 0 ];
  if (rarity === 5) {
    s[0] = Math.min(3, s[0] + 1);
    s[1] = Math.min(3, s[1] + 1);
    s[2] = Math.min(3, s[2] + 1);
  } else if (rarity === 6) {
    s[0] = Math.min(3, s[0] + 1);
    s[1] = Math.min(3, s[1] + 1);
    // third slot unchanged
  }
  return s;
}
/* Effective deco slots for a piece, honoring Transcend.
   Transcend only re-aligns Rarity 5 & 6 gear (computed from base slots). */
function armorCanTranscend(rarity) { return rarity === 5 || rarity === 6; }
function armorPieceSlots(piece, rarity, transcendOn) {
  if (!piece) return [0, 0, 0];
  if (transcendOn && armorCanTranscend(rarity)) {
    return armorTranscendSlots(piece.slots, rarity);
  }
  return piece.slots;
}
function armorPieceRarity(setId) {
  var s = (typeof armorFindSet === 'function') ? armorFindSet(setId) : null;
  return s ? s.rarity : null;
}
/* Toggle Transcend on ONE equipped piece (re-aligns just that piece's deco slots). */
function armorTogglePieceTranscend(kind, on) {
  if (typeof armorBuild === 'undefined' || !armorBuild[kind]) return;
  armorBuild[kind].transcend = !!on;
  if (typeof armorDecoPrune === 'function') armorDecoPrune();
  if (typeof armorSaveBuild === 'function') armorSaveBuild();
  if (typeof armorRenderBuild === 'function') armorRenderBuild();
}

function armorDecoPrune() {
  if (typeof armorBuild === 'undefined') return;
  ['Head', 'Chest', 'Arms', 'Waist', 'Legs'].forEach(function (kind) {
    var b = armorBuild[kind];
    var piece = b ? armorPieceFor(b.setId, b.variant, kind) : null;
    var sl = piece ? armorPieceSlots(piece, armorPieceRarity(b.setId), b.transcend) : null;
    for (var i = 0; i < 3; i++) {
      var lv = sl ? (sl[i] || 0) : 0;
      if (!lv) { armorSetDecoFor(kind, i, ''); continue; }
      // de-toggling Transcend can shrink a slot — drop a deco that no longer fits
      var did = armorDecoFor(kind, i);
      if (did && typeof DECO_BY_ID !== 'undefined' && DECO_BY_ID[did]) {
        var dd = DECO_BY_ID[did];
        if (dd.slot && dd.slot > lv) armorSetDecoFor(kind, i, '');
      }
    }
  });
  // charm deco slots: only valid in custom mode, sized by the chosen combo
  var defs = (typeof armorCharmSlotDefs === 'function') ? armorCharmSlotDefs() : [];
  for (var ci = 0; ci < 3; ci++) {
    if (!defs[ci]) { armorSetDecoFor('Charm', ci, ''); continue; }
    var did = armorDecoFor('Charm', ci);
    if (did && typeof DECO_BY_ID !== 'undefined' && DECO_BY_ID[did]) {
      var dd = DECO_BY_ID[did];
      // clear if deco no longer fits the slot type or size
      var dtype = dd.type || 'armor';
      if (dtype !== defs[ci].type || (dd.slot && dd.slot > defs[ci].lv)) armorSetDecoFor('Charm', ci, '');
    }
  }
}

function armorKindHasDeco(kind) {
  for (var i = 0; i < 5; i++) {
    if (armorDecoFor(kind, i)) return true;
  }
  return false;
}

function armorDecoHasAny() {
  return armorKindHasDeco('Armor') || armorKindHasDeco('Weapon');
}

function armorDecoSkillTotals() {
  var totals = {};
  ['Weapon', 'Head', 'Chest', 'Arms', 'Waist', 'Legs', 'Charm'].forEach(function(kind) {
    for (var i = 0; i < 3; i++) {
      var decoId = armorDecoFor(kind, i);
      if (decoId && DECO_BY_ID[decoId]) {
        var d = DECO_BY_ID[decoId];
        if (!(d.skill in totals)) totals[d.skill] = 0;
        totals[d.skill] += d.lv;
        // Dual-skill (combined) decorations carry a second skill
        if (d.skill2) {
          if (!(d.skill2 in totals)) totals[d.skill2] = 0;
          totals[d.skill2] += (d.lv2 || 0);
        }
      }
    }
  });
  return totals;
}

function armorDecosForSlot(kind) {
  return kind === 'Armor' ? 'armor' : 'weapon';
}

function armorClearPieceDecos(kind) {
  for (var i = 0; i < 5; i++) {
    armorSetDecoFor(kind, i, null);
  }
  if (typeof renderArmorBuilder === 'function') renderArmorBuilder();
}

function armorClearAllDecos() {
  ['Armor', 'Weapon'].forEach(function(kind) {
    for (var i = 0; i < 5; i++) {
      armorSetDecoFor(kind, i, null);
    }
  });
  if (typeof renderArmorBuilder === 'function') renderArmorBuilder();
}

/* slots: array of 3 ints (0 = empty, 1/2/3 = slot level)
   skills: [ [name, level], ... ]   (level omitted-as-0 means just the skill) */
var ARMOR_SETS = [
  {
    id: 'sororal', set: 'Sororal', element: 'Dragon', tag: 'α', rarity: 8, verified: true,
    blurb: 'Ace hunter Nadia’s signature set (Gore Magala / Nerscylla materials). Burst-stacking offense — Burst 5 with Stamina Surge, Partbreaker and Evade Extender — under Gore Magala’s Tyranny and the Glory’s Favor (Luck) group skill.',
    bonus: { name: 'Gore Magala\'s Tyranny', tiers: [['Black Eclipse I', 2], ['Black Eclipse II', 4]] },
    variants: {
      'α': {
        group: { name: 'Glory\'s Favor', tiers: [['Luck', 3]] },
        pieces: [
          { slot: 'Head', name: 'Sororal Earrings α', slots: [3,1,1], skills: [['Burst',1]] },
          { slot: 'Chest', name: 'Sororal Coat α', slots: [0,0,0], skills: [['Stamina Surge',2],['Burst',1],['Partbreaker',1]] },
          { slot: 'Arms', name: 'Sororal Vambraces α', slots: [2,0,0], skills: [['Burst',1],['Partbreaker',1],['Evade Extender',1]] },
          { slot: 'Waist', name: 'Sororal Coil α', slots: [0,0,0], skills: [['Burst',2],['Evade Extender',2]] },
          { slot: 'Legs', name: 'Sororal Boots α', slots: [3,2,0], skills: [['Stamina Surge',1],['Partbreaker',1]] }
        ]
      }
    }
  },
  {
    id: 'uth-duna-g', set: 'Uth Duna', element: 'Water', tag: 'γ', rarity: 8, verified: true,
    blurb: 'Arch-Tempered Uth Duna γ (event "These Roots Run Deep"). Tool Specialist + Peak Performance with the Lord’s Soul group skill.',
    bonus: { name: 'Uth Duna\'s Cover', tiers: [['Protective Veil I', 2], ['Protective Veil II', 4]] },
    variants: {
      'γ': {
        group: { name: 'Lord\'s Soul', tiers: [['Guts (Tenacity)', 3]] },
        pieces: [
          { slot: 'Head', name: 'Duna Wildhelm γ', slots: [2,2,0], skills: [['Peak Performance',2],['Earplugs',1]] },
          { slot: 'Chest', name: 'Duna Wildmail γ', slots: [0,0,0], skills: [['Peak Performance',3],['Earplugs',2]] },
          { slot: 'Arms', name: 'Duna Wildbraces γ', slots: [2,0,0], skills: [['Tool Specialist',3],['Agitator',1]] },
          { slot: 'Waist', name: 'Duna Wildcoil γ', slots: [3,3,0], skills: [['Tool Specialist',2]] },
          { slot: 'Legs', name: 'Duna Wildgreaves γ', slots: [3,1,1], skills: [['Quick Sheathe',3],['Agitator',1]] }
        ]
      }
    }
  },
  {
    id: 'gogmazios', set: 'Gogmazios', element: 'Dragon', tag: 'α / β', rarity: 8, verified: true,
    blurb: 'Title Update 4 Elder Dragon set (Oilwell Basin). Gogmapocalypse drives Mutual Hostility — and each piece carries a different borrowed Set Bonus (counts as 1 piece toward that monster\u2019s set bonus).',
    bonus: { name: 'Gogmapocalypse', tiers: [['Mutual Hostility I', 2], ['Mutual Hostility II', 4]] },
    variants: {
      'α': {
        group: null,
        pieces: [
          { slot: 'Head', name: 'Gogmazios Helm α', slots: [3,1,0], skills: [['Peak Performance',2],['Elemental Absorption',2]], setBonus: { name: 'Zoh Shia\'s Pulse' } },
          { slot: 'Chest', name: 'Gogmazios Mail α', slots: [3,2,0], skills: [['Adrenaline Rush',2],['Speed Eating',2],['Aquatic/Oilsilt Mobility',1]], setBonus: { name: 'Xu Wu\'s Vigor' } },
          { slot: 'Arms', name: 'Gogmazios Vambraces α', slots: [2,1,0], skills: [['Maximum Might',2],['Agitator',1]], setBonus: { name: 'Fulgur Anjanath\'s Will' } },
          { slot: 'Waist', name: 'Gogmazios Coil α', slots: [2,1,1], skills: [['Burst',2],['Peak Performance',1]], setBonus: { name: 'Ebony Odogaron\'s Power' } },
          { slot: 'Legs', name: 'Gogmazios Greaves α', slots: [3,2,1], skills: [['Peak Performance',2],['Agitator',1]], setBonus: { name: 'Doshaguma\'s Might' } }
        ]
      },
      'β': {
        group: null,
        pieces: [
          { slot: 'Head', name: 'Gogmazios Helm β', slots: [3,1,0], skills: [['Elemental Absorption',2],['Peak Performance',2]], setBonus: { name: 'Guardian Arkveld\'s Vitality' } },
          { slot: 'Chest', name: 'Gogmazios Mail β', slots: [3,2,0], skills: [['Adrenaline Rush',2],['Speed Eating',2],['Aquatic/Oilsilt Mobility',1]], setBonus: { name: 'Rathalos\'s Flare' } },
          { slot: 'Arms', name: 'Gogmazios Vambraces β', slots: [2,1,0], skills: [['Maximum Might',2],['Agitator',1]], setBonus: { name: 'Blangonga\'s Spirit' } },
          { slot: 'Waist', name: 'Gogmazios Coil β', slots: [2,1,1], skills: [['Burst',2],['Peak Performance',1]], setBonus: { name: 'Mizutsune\'s Prowess' } },
          { slot: 'Legs', name: 'Gogmazios Greaves β', slots: [3,2,1], skills: [['Peak Performance',2],['Agitator',1]], setBonus: { name: 'Gravios\'s Protection' } }
        ]
      }
    }
  },
  {
    id: 'arkveld-g', set: 'Arkveld', element: 'Dragon', tag: 'γ', rarity: 8, verified: true,
    blurb: 'Arch-Tempered Arkveld γ (Arkvulcan) — endgame elemental chassis with built-in Weakness Exploit 3, Convert Element and Elemental Absorption.',
    bonus: { name: 'Arkveld\'s Hunger', tiers: [['Hasten Recovery I', 2], ['Hasten Recovery II', 4]] },
    variants: {
      'γ': {
        group: { name: 'Lord\'s Soul', tiers: [['Guts (Tenacity)', 3]] },
        pieces: [
          { slot: 'Head', name: 'Arkvulcan Helm γ', slots: [2,1,0], skills: [['Weakness Exploit',3]] },
          { slot: 'Chest', name: 'Arkvulcan Mail γ', slots: [3,2,0], skills: [['Blight Resistance',1],['Convert Element',3]] },
          { slot: 'Arms', name: 'Arkvulcan Vambraces γ', slots: [1,1,0], skills: [['Weakness Exploit',2],['Flayer',2]] },
          { slot: 'Waist', name: 'Arkvulcan Coil γ', slots: [2,2,1], skills: [['Flayer',1],['Elemental Absorption',3]] },
          { slot: 'Legs', name: 'Arkvulcan Greaves γ', slots: [3,3,0], skills: [['Flayer',2],['Blight Resistance',2]] }
        ]
      }
    }
  },
  {
    id: 'nu-udra-g', set: 'Nu Udra', element: 'Fire', tag: 'γ', rarity: 8, verified: true,
    blurb: 'Arch-Tempered Nu Udra γ — Burst 3 + Resentment offense with the Bad Blood set bonus; thrives at low health.',
    bonus: { name: 'Nu Udra\'s Mutiny', tiers: [['Bad Blood I', 2], ['Bad Blood II', 4]] },
    variants: {
      'γ': {
        group: { name: 'Lord\'s Soul', tiers: [['Guts (Tenacity)', 3]] },
        pieces: [
          { slot: 'Head', name: 'Udra Mirehelm γ', slots: [1,1,1], skills: [['Burst',3]] },
          { slot: 'Chest', name: 'Udra Miremail γ', slots: [3,3,0], skills: [['Counterstrike',2]] },
          { slot: 'Arms', name: 'Udra Mirebraces γ', slots: [3,1,1], skills: [['Resentment',3]] },
          { slot: 'Waist', name: 'Udra Mirecoil γ', slots: [2,0,0], skills: [['Ambush',1],['Burst',2]] },
          { slot: 'Legs', name: 'Udra Miregreaves γ', slots: [2,0,0], skills: [['Speed Eating',3],['Resentment',2],['Counterstrike',1]] }
        ]
      }
    }
  },
  {
    id: 'rey-dau-g', set: 'Rey Dau', element: 'Thunder', tag: 'γ', rarity: 8, verified: true,
    blurb: 'Arch-Tempered Rey Dau γ — aggressive thunder set with Latent Power 3, Weakness Exploit and Maximum Might built in.',
    bonus: { name: 'Rey Dau\'s Voltage', tiers: [['Thunderous Roar I', 2], ['Thunderous Roar II', 4]] },
    variants: {
      'γ': {
        group: { name: 'Lord\'s Soul', tiers: [['Guts (Tenacity)', 3]] },
        pieces: [
          { slot: 'Head', name: 'Rey Sandhelm γ', slots: [3,0,0], skills: [['Stamina Surge',1],['Weakness Exploit',1],['Maximum Might',1]] },
          { slot: 'Chest', name: 'Rey Sandmail γ', slots: [1,0,0], skills: [['Latent Power',3]] },
          { slot: 'Arms', name: 'Rey Sandbraces γ', slots: [3,3,0], skills: [['Evade Extender',2]] },
          { slot: 'Waist', name: 'Rey Sandcoil γ', slots: [0,0,0], skills: [['Latent Power',2],['Maximum Might',2]] },
          { slot: 'Legs', name: 'Rey Sandgreaves γ', slots: [3,0,0], skills: [['Stun Resistance',3],['Stamina Surge',2]] }
        ]
      }
    }
  },
  {
    id: 'rey-dau', set: 'Rey Dau', element: 'Thunder', tag: 'α / β', rarity: 7, verified: true,
    blurb: 'Rey Dau — Rey Dau\'s Voltage 5, Lord\'s Favor 5, Latent Power 5. Slots & per-piece skills verified against game data (Excel source).',
    bonus: { name: 'Rey Dau\'s Voltage', tiers: [['Thunderous Roar I', 2], ['Thunderous Roar II', 4]] },
    variants: {
      'α': {
        group: { name: 'Lord\'s Favor', tiers: [['Inspiration', 3]] },
        pieces: [
          { slot: 'Head', name: 'Rey Sandhelm α', slots: [0,0,0], skills: [['Rey Dau\'s Voltage',1],['Latent Power',2],['Evade Extender',1]] },
          { slot: 'Chest', name: 'Rey Sandmail α', slots: [2,1,0], skills: [['Rey Dau\'s Voltage',1],['Maximum Might',2],['Stamina Surge',1]] },
          { slot: 'Arms', name: 'Rey Sandbraces α', slots: [1,1,0], skills: [['Rey Dau\'s Voltage',1],['Latent Power',2],['Stun Resistance',1]] },
          { slot: 'Waist', name: 'Rey Sandcoil α', slots: [1,1,0], skills: [['Rey Dau\'s Voltage',1],['Stamina Surge',2],['Stun Resistance',2]] },
          { slot: 'Legs', name: 'Rey Sandgreaves α', slots: [1,1,1], skills: [['Rey Dau\'s Voltage',1],['Latent Power',1],['Maximum Might',1]] }
        ]
      },
      'β': {
        group: { name: 'Lord\'s Fury', tiers: [['Resuscitate', 3]] },
        pieces: [
          { slot: 'Head', name: 'Rey Sandhelm β', slots: [1,1,1], skills: [['Rey Dau\'s Voltage',1],['Latent Power',1],['Evade Extender',1]] },
          { slot: 'Chest', name: 'Rey Sandmail β', slots: [3,2,1], skills: [['Rey Dau\'s Voltage',1],['Maximum Might',1],['Stamina Surge',1]] },
          { slot: 'Arms', name: 'Rey Sandbraces β', slots: [1,1,1], skills: [['Rey Dau\'s Voltage',1],['Latent Power',2]] },
          { slot: 'Waist', name: 'Rey Sandcoil β', slots: [2,1,1], skills: [['Rey Dau\'s Voltage',1],['Stamina Surge',1],['Stun Resistance',2]] },
          { slot: 'Legs', name: 'Rey Sandgreaves β', slots: [3,2,1], skills: [['Rey Dau\'s Voltage',1],['Latent Power',1]] }
        ]
      }
    }
  },
  {
    id: 'gore-magala', set: 'Gore Magala', element: 'Dragon', tag: 'α / β', rarity: 7, verified: true,
    blurb: 'Evade Window + Antivirus core. Black Eclipse set bonus rewards the Frenzy playstyle.',
    bonus: { name: 'Gore Magala\'s Tyranny', tiers: [['Black Eclipse I', 2], ['Black Eclipse II', 4]] },
    variants: {
      'α': {
        group: { name: 'Scaling Prowess', tiers: [['Master Mounter', 3]] },
        pieces: [
          { slot: 'Head', name: 'Gore Helm α', slots: [2,0,0], skills: [['Evade Window',2],['Coalescence',1]] },
          { slot: 'Chest', name: 'Gore Mail α', slots: [3,0,0], skills: [['Evade Window',2],['Antivirus',1]] },
          { slot: 'Arms', name: 'Gore Vambraces α', slots: [2,1,0], skills: [['Evade Window',1],['Constitution',2]] },
          { slot: 'Waist', name: 'Gore Coil α', slots: [3,1,0], skills: [['Constitution',2],['Antivirus',1]] },
          { slot: 'Legs', name: 'Gore Greaves α', slots: [3,1,0], skills: [['Flinch Free',2],['Antivirus',1]] }
        ]
      },
      'β': {
        group: { name: 'Scale Layering', tiers: [['Adrenaline', 3]] },
        pieces: [
          { slot: 'Head', name: 'Gore Helm β', slots: [3,1,0], skills: [['Evade Window',1],['Coalescence',1]] },
          { slot: 'Chest', name: 'Gore Mail β', slots: [3,1,0], skills: [['Evade Window',2]] },
          { slot: 'Arms', name: 'Gore Vambraces β', slots: [2,2,0], skills: [['Evade Window',1],['Constitution',1]] },
          { slot: 'Waist', name: 'Gore Coil β', slots: [3,2,0], skills: [['Constitution',2]] },
          { slot: 'Legs', name: 'Gore Greaves β', slots: [3,1,1], skills: [['Flinch Free',1],['Antivirus',1]] }
        ]
      }
    }
  },
  {
    id: 'arkveld', set: 'Arkveld', element: 'Dragon', tag: 'α / β', rarity: 8, verified: true,
    blurb: 'Arkveld — Arkveld\'s Hunger 5, Fortifying Pelt 5, Convert Element 3. Slots & per-piece skills verified against game data (Excel source).',
    bonus: { name: 'Arkveld\'s Hunger', tiers: [['Hasten Recovery I', 2], ['Hasten Recovery II', 4]] },
    variants: {
      'α': {
        group: { name: 'Fortifying Pelt', tiers: [['Fortify', 3]] },
        pieces: [
          { slot: 'Head', name: 'Arkvulcan Helm α', slots: [0,0,0], skills: [['Arkveld\'s Hunger',1],['Convert Element',1],['Elemental Absorption',2]] },
          { slot: 'Chest', name: 'Arkvulcan Mail α', slots: [1,1,0], skills: [['Arkveld\'s Hunger',1],['Weakness Exploit',1],['Elemental Absorption',1]] },
          { slot: 'Arms', name: 'Arkvulcan Vambraces α', slots: [2,2,1], skills: [['Arkveld\'s Hunger',1],['Convert Element',1],['Recovery Speed',1]] },
          { slot: 'Waist', name: 'Arkvulcan Coil α', slots: [1,0,0], skills: [['Arkveld\'s Hunger',1],['Weakness Exploit',2],['Recovery Speed',2]] },
          { slot: 'Legs', name: 'Arkvulcan Greaves α', slots: [2,1,1], skills: [['Arkveld\'s Hunger',1],['Convert Element',1],['Quick Sheathe',2]] }
        ]
      },
      'β': {
        group: { name: 'Alluring Pelt', tiers: [['Diversion', 3]] },
        pieces: [
          { slot: 'Head', name: 'Arkvulcan Helm β', slots: [3,2,2], skills: [['Arkveld\'s Hunger',1],['Convert Element',1]] },
          { slot: 'Chest', name: 'Arkvulcan Mail β', slots: [2,2,1], skills: [['Arkveld\'s Hunger',1],['Weakness Exploit',1]] },
          { slot: 'Arms', name: 'Arkvulcan Vambraces β', slots: [3,2,2], skills: [['Arkveld\'s Hunger',1],['Convert Element',1]] },
          { slot: 'Waist', name: 'Arkvulcan Coil β', slots: [2,1,0], skills: [['Arkveld\'s Hunger',1],['Weakness Exploit',2],['Recovery Speed',1]] },
          { slot: 'Legs', name: 'Arkvulcan Greaves β', slots: [2,1,1], skills: [['Arkveld\'s Hunger',1],['Convert Element',1],['Quick Sheathe',1]] }
        ]
      }
    }
  },
  {
    id: 'g-arkveld', set: 'Guardian Arkveld', element: 'Dragon', tag: 'α / β', rarity: 8, verified: true,
    blurb: 'Guardian Arkveld — Guardian Arkveld\'s Vitality 5, Guardian\'s Pulse 5, Flayer 5. Slots & per-piece skills verified against game data (Excel source).',
    bonus: { name: 'Guardian Arkveld\'s Vitality', tiers: [['Decimator I', 2], ['Decimator II', 4]] },
    variants: {
      'α': {
        group: { name: 'Guardian\'s Pulse', tiers: [['Wylk Burst', 3]] },
        pieces: [
          { slot: 'Head', name: 'G. Arkveld Helm α', slots: [2,1,0], skills: [['Guardian Arkveld\'s Vitality',1],['Flayer',1],['Partbreaker',2]] },
          { slot: 'Chest', name: 'G. Arkveld Mail α', slots: [0,0,0], skills: [['Guardian Arkveld\'s Vitality',1],['Flayer',2],['Blight Resistance',2]] },
          { slot: 'Arms', name: 'G. Arkveld Vambraces α', slots: [1,0,0], skills: [['Guardian Arkveld\'s Vitality',1],['Weakness Exploit',2],['Blight Resistance',1]] },
          { slot: 'Waist', name: 'G. Arkveld Coil α', slots: [0,0,0], skills: [['Guardian Arkveld\'s Vitality',1],['Flayer',2],['Elemental Absorption',1]] },
          { slot: 'Legs', name: 'G. Arkveld Greaves α', slots: [0,0,0], skills: [['Guardian Arkveld\'s Vitality',1],['Elemental Absorption',2],['Weakness Exploit',1]] }
        ]
      },
      'β': {
        group: { name: 'Guardian\'s Protection', tiers: [['Ward of Wyveria', 3]] },
        pieces: [
          { slot: 'Head', name: 'G. Arkveld Helm β', slots: [2,1,1], skills: [['Guardian Arkveld\'s Vitality',1],['Flayer',1],['Partbreaker',1]] },
          { slot: 'Chest', name: 'G. Arkveld Mail β', slots: [1,1,1], skills: [['Guardian Arkveld\'s Vitality',1],['Flayer',1],['Blight Resistance',2]] },
          { slot: 'Arms', name: 'G. Arkveld Vambraces β', slots: [3,2,1], skills: [['Guardian Arkveld\'s Vitality',1],['Weakness Exploit',2]] },
          { slot: 'Waist', name: 'G. Arkveld Coil β', slots: [2,1,1], skills: [['Guardian Arkveld\'s Vitality',1],['Flayer',2]] },
          { slot: 'Legs', name: 'G. Arkveld Greaves β', slots: [2,1,1], skills: [['Guardian Arkveld\'s Vitality',1],['Elemental Absorption',1],['Weakness Exploit',1]] }
        ]
      }
    }
  },
  {
    id: 'blangonga', set: 'Blangonga', element: 'Ice', tag: 'α / β', rarity: 6, verified: true,
    blurb: 'Blangonga — Blangonga\'s Spirit 5, Fortifying Pelt 5, Agitator 5. Slots & per-piece skills verified against game data (Excel source).',
    bonus: { name: 'Blangonga\'s Spirit', tiers: [['War Cry I', 2], ['War Cry II', 4]] },
    variants: {
      'α': {
        group: { name: 'Fortifying Pelt', tiers: [['Fortify', 3]] },
        pieces: [
          { slot: 'Head', name: 'Blango Helm α', slots: [2,1,0], skills: [['Blangonga\'s Spirit',1],['Wide-Range',2],['Counterstrike',1]] },
          { slot: 'Chest', name: 'Blango Mail α', slots: [0,0,0], skills: [['Blangonga\'s Spirit',1],['Agitator',2],['Item Prolonger',2]] },
          { slot: 'Arms', name: 'Blango Vambraces α', slots: [1,1,0], skills: [['Blangonga\'s Spirit',1],['Counterstrike',1],['Palico Rally',2]] },
          { slot: 'Waist', name: 'Blango Coil α', slots: [1,0,0], skills: [['Blangonga\'s Spirit',1],['Agitator',2],['Wide-Range',1]] },
          { slot: 'Legs', name: 'Blango Greaves α', slots: [2,1,0], skills: [['Blangonga\'s Spirit',1],['Agitator',1],['Counterstrike',1]] }
        ]
      },
      'β': {
        group: { name: 'Alluring Pelt', tiers: [['Diversion', 3]] },
        pieces: [
          { slot: 'Head', name: 'Blango Helm β', slots: [3,2,1], skills: [['Blangonga\'s Spirit',1],['Wide-Range',2]] },
          { slot: 'Chest', name: 'Blango Mail β', slots: [1,1,0], skills: [['Blangonga\'s Spirit',1],['Agitator',2]] },
          { slot: 'Arms', name: 'Blango Vambraces β', slots: [2,2,1], skills: [['Blangonga\'s Spirit',1],['Counterstrike',1]] },
          { slot: 'Waist', name: 'Blango Coil β', slots: [2,1,0], skills: [['Blangonga\'s Spirit',1],['Agitator',2]] },
          { slot: 'Legs', name: 'Blango Greaves β', slots: [2,2,1], skills: [['Blangonga\'s Spirit',1],['Agitator',1]] }
        ]
      }
    }
  },
  {
    id: 'nu-udra', set: 'Nu Udra', element: 'Fire', tag: 'α / β', rarity: 7, verified: true,
    blurb: 'Nu Udra — Nu Udra\'s Mutiny 5, Lord\'s Favor 5, Resentment 5. Slots & per-piece skills verified against game data (Excel source).',
    bonus: { name: 'Nu Udra\'s Mutiny', tiers: [['Bad Blood I', 2], ['Bad Blood II', 4]] },
    variants: {
      'α': {
        group: { name: 'Lord\'s Favor', tiers: [['Inspiration', 3]] },
        pieces: [
          { slot: 'Head', name: 'Udra Mirehelm α', slots: [2,1,0], skills: [['Nu Udra\'s Mutiny',1],['Resentment',2],['Counterstrike',1]] },
          { slot: 'Chest', name: 'Udra Miremail α', slots: [2,1,0], skills: [['Nu Udra\'s Mutiny',1],['Resentment',1],['Burst',1]] },
          { slot: 'Arms', name: 'Udra Mirebraces α', slots: [1,1,0], skills: [['Nu Udra\'s Mutiny',1],['Speed Eating',2],['Counterstrike',2]] },
          { slot: 'Waist', name: 'Udra Mirecoil α', slots: [1,1,0], skills: [['Nu Udra\'s Mutiny',1],['Resentment',2],['Speed Eating',1]] },
          { slot: 'Legs', name: 'Udra Miregreaves α', slots: [1,1,1], skills: [['Nu Udra\'s Mutiny',1],['Burst',1],['Windproof',2]] }
        ]
      },
      'β': {
        group: { name: 'Lord\'s Fury', tiers: [['Resuscitate', 3]] },
        pieces: [
          { slot: 'Head', name: 'Udra Mirehelm β', slots: [2,2,1], skills: [['Nu Udra\'s Mutiny',1],['Resentment',1],['Counterstrike',1]] },
          { slot: 'Chest', name: 'Udra Miremail β', slots: [3,2,1], skills: [['Nu Udra\'s Mutiny',1],['Resentment',1]] },
          { slot: 'Arms', name: 'Udra Mirebraces β', slots: [2,1,1], skills: [['Nu Udra\'s Mutiny',1],['Speed Eating',2],['Counterstrike',1]] },
          { slot: 'Waist', name: 'Udra Mirecoil β', slots: [1,1,1], skills: [['Nu Udra\'s Mutiny',1],['Resentment',2]] },
          { slot: 'Legs', name: 'Udra Miregreaves β', slots: [2,1,1], skills: [['Nu Udra\'s Mutiny',1],['Burst',1],['Windproof',1]] }
        ]
      }
    }
  },
  {
    id: 'ajarakan', set: 'Ajarakan', element: 'Fire', tag: 'α / β', rarity: 6, verified: true,
    blurb: 'Ajarakan — Fortifying Pelt 5, Resentment 5, Partbreaker 5. Slots & per-piece skills verified against game data (Excel source).',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Fortifying Pelt', tiers: [['Fortify', 3]] },
        pieces: [
          { slot: 'Head', name: 'Ajarakan Helm α', slots: [1,0,0], skills: [['Resentment',2],['Bombardier',1]] },
          { slot: 'Chest', name: 'Ajarakan Mail α', slots: [1,0,0], skills: [['Resentment',2],['Blast Resistance',1]] },
          { slot: 'Arms', name: 'Ajarakan Vambraces α', slots: [1,1,0], skills: [['Partbreaker',1],['Bombardier',2]] },
          { slot: 'Waist', name: 'Ajarakan Coil α', slots: [1,0,0], skills: [['Partbreaker',2],['Blast Resistance',2]] },
          { slot: 'Legs', name: 'Ajarakan Greaves α', slots: [0,0,0], skills: [['Partbreaker',2],['Resentment',1]] }
        ]
      },
      'β': {
        group: { name: 'Alluring Pelt', tiers: [['Diversion', 3]] },
        pieces: [
          { slot: 'Head', name: 'Ajarakan Helm β', slots: [2,1,1], skills: [['Resentment',1],['Bombardier',1]] },
          { slot: 'Chest', name: 'Ajarakan Mail β', slots: [1,1,0], skills: [['Resentment',2]] },
          { slot: 'Arms', name: 'Ajarakan Vambraces β', slots: [2,1,1], skills: [['Partbreaker',1],['Bombardier',1]] },
          { slot: 'Waist', name: 'Ajarakan Coil β', slots: [1,1,0], skills: [['Partbreaker',2],['Blast Resistance',1]] },
          { slot: 'Legs', name: 'Ajarakan Greaves β', slots: [2,1,0], skills: [['Partbreaker',2]] }
        ]
      }
    }
  },
  {
    id: 'gravios', set: 'Gravios', element: 'Fire', tag: 'α / β', rarity: 6, verified: true,
    blurb: 'Gravios — Gravios\'s Protection 5, Scaling Prowess 5, Peak Performance 5. Slots & per-piece skills verified against game data (Excel source).',
    bonus: { name: 'Gravios\'s Protection', tiers: [['Flawless Armor I', 2], ['Flawless Armor II', 4]] },
    variants: {
      'α': {
        group: { name: 'Scaling Prowess', tiers: [['Master Mounter', 3]] },
        pieces: [
          { slot: 'Head', name: 'Gravios Helm α', slots: [2,1,1], skills: [['Gravios\'s Protection',1],['Peak Performance',1],['Tremor Resistance',1]] },
          { slot: 'Chest', name: 'Gravios Mail α', slots: [2,1,1], skills: [['Gravios\'s Protection',1],['Peak Performance',1],['Recovery Speed',2]] },
          { slot: 'Arms', name: 'Gravios Vambraces α', slots: [1,0,0], skills: [['Gravios\'s Protection',1],['Peak Performance',2],['Flinch Free',1]] },
          { slot: 'Waist', name: 'Gravios Coil α', slots: [1,1,0], skills: [['Gravios\'s Protection',1],['Peak Performance',1],['Flinch Free',2]] },
          { slot: 'Legs', name: 'Gravios Greaves α', slots: [2,1,1], skills: [['Gravios\'s Protection',1],['Tremor Resistance',2],['Recovery Speed',1]] }
        ]
      },
      'β': {
        group: { name: 'Scale Layering', tiers: [['Adrenaline', 3]] },
        pieces: [
          { slot: 'Head', name: 'Gravios Helm β', slots: [2,2,1], skills: [['Gravios\'s Protection',1],['Peak Performance',1]] },
          { slot: 'Chest', name: 'Gravios Mail β', slots: [2,2,1], skills: [['Gravios\'s Protection',1],['Peak Performance',1],['Recovery Speed',1]] },
          { slot: 'Arms', name: 'Gravios Vambraces β', slots: [1,1,0], skills: [['Gravios\'s Protection',1],['Peak Performance',2]] },
          { slot: 'Waist', name: 'Gravios Coil β', slots: [2,1,1], skills: [['Gravios\'s Protection',1],['Peak Performance',1],['Flinch Free',1]] },
          { slot: 'Legs', name: 'Gravios Greaves β', slots: [2,2,1], skills: [['Gravios\'s Protection',1],['Tremor Resistance',1],['Recovery Speed',1]] }
        ]
      }
    }
  },
  {
    id: 'doshaguma', set: 'Doshaguma', element: 'None', tag: 'α / β', rarity: 6, verified: true,
    blurb: 'Doshaguma — Doshaguma\'s Might 5, Fortifying Pelt 5, Free Meal 3. Slots & per-piece skills verified against game data (Excel source).',
    bonus: { name: 'Doshaguma\'s Might', tiers: [['Powerhouse I', 2], ['Powerhouse II', 4]] },
    variants: {
      'α': {
        group: { name: 'Fortifying Pelt', tiers: [['Fortify', 3]] },
        pieces: [
          { slot: 'Head', name: 'Doshaguma Helm α', slots: [2,1,1], skills: [['Doshaguma\'s Might',1],['Free Meal',2],['Stun Resistance',1]] },
          { slot: 'Chest', name: 'Doshaguma Mail α', slots: [1,0,0], skills: [['Doshaguma\'s Might',1],['Latent Power',1],['Stamina Surge',1]] },
          { slot: 'Arms', name: 'Doshaguma Braces α', slots: [1,1,0], skills: [['Doshaguma\'s Might',1],['Stun Resistance',2],['Stamina Surge',1]] },
          { slot: 'Waist', name: 'Doshaguma Coil α', slots: [1,0,0], skills: [['Doshaguma\'s Might',1],['Latent Power',2]] },
          { slot: 'Legs', name: 'Doshaguma Greaves α', slots: [2,1,1], skills: [['Doshaguma\'s Might',1],['Free Meal',1],['Recovery Up',2]] }
        ]
      },
      'β': {
        group: { name: 'Alluring Pelt', tiers: [['Diversion', 3]] },
        pieces: [
          { slot: 'Head', name: 'Doshaguma Helm β', slots: [3,2,1], skills: [['Doshaguma\'s Might',1],['Free Meal',1],['Stun Resistance',1]] },
          { slot: 'Chest', name: 'Doshaguma Mail β', slots: [3,2,1], skills: [['Doshaguma\'s Might',1],['Latent Power',1]] },
          { slot: 'Arms', name: 'Doshaguma Braces β', slots: [2,1,1], skills: [['Doshaguma\'s Might',1],['Stun Resistance',1],['Stamina Surge',1]] },
          { slot: 'Waist', name: 'Doshaguma Coil β', slots: [2,2,1], skills: [['Doshaguma\'s Might',1],['Latent Power',1]] },
          { slot: 'Legs', name: 'Doshaguma Greaves β', slots: [3,2,1], skills: [['Doshaguma\'s Might',1],['Free Meal',1],['Recovery Up',1]] }
        ]
      }
    }
  },
  {
    id: 'mizutsune', set: 'Mizutsune', element: 'Water', tag: 'α / β', rarity: 6, verified: true,
    blurb: 'Slippery evasion set — Bubbly Dance set bonus with Evade Window for graceful, low-risk play.',
    bonus: { name: 'Mizutsune\'s Prowess', tiers: [['Bubbly Dance I', 2], ['Bubbly Dance II', 4]] },
    variants: {
      'α': {
        verified: true,
        group: { name: 'Mobility Mastery', tiers: [['Evade Window', 3]] },
        pieces: [
          { slot: 'Head', name: 'Mizutsune Helm α', slots: [3,0,0], skills: [['Evade Extender',1],['Aquatic/Oilsilt Mobility',2]] },
          { slot: 'Chest', name: 'Mizutsune Mail α', slots: [1,0,0], skills: [['Constitution',1],['Burst',2]] },
          { slot: 'Arms', name: 'Mizutsune Braces α', slots: [1,0,0], skills: [['Evade Extender',2],['Evade Window',2]] },
          { slot: 'Waist', name: 'Mizutsune Coil α', slots: [2,1,0], skills: [['Constitution',2],['Burst',1]] },
          { slot: 'Legs', name: 'Mizutsune Greaves α', slots: [1,0,0], skills: [['Peak Performance',1],['Burst',2]] }
        ]
      },
      'β': {
        verified: true,
        group: { name: 'Mobility Mastery', tiers: [['Evade Window', 3]] },
        pieces: [
          { slot: 'Head', name: 'Mizutsune Helm β', slots: [3,2,0], skills: [['Aquatic/Oilsilt Mobility',2]] },
          { slot: 'Chest', name: 'Mizutsune Mail β', slots: [2,2,0], skills: [['Constitution',1],['Burst',1]] },
          { slot: 'Arms', name: 'Mizutsune Braces β', slots: [3,0,0], skills: [['Evade Extender',1],['Evade Window',2]] },
          { slot: 'Waist', name: 'Mizutsune Coil β', slots: [3,2,1], skills: [['Constitution',2]] },
          { slot: 'Legs', name: 'Mizutsune Greaves β', slots: [3,0,0], skills: [['Burst',2]] }
        ]
      }
    }
  },
  {
    id: 'seregios', set: 'Seregios', element: 'None', tag: 'α / β', rarity: 7, verified: false,
    blurb: 'TU2 sharpness set — Razor’s Edge set bonus keeps your blade keen via Bladescale Honing.',
    bonus: { name: 'Seregios\'s Tenacity', tiers: [['Razor\'s Edge I', 2], ['Razor\'s Edge II', 4]] },
    variants: {
      'α': {
        group: { name: 'Battle Prowess', tiers: [['Counterstrike', 3]] },
        pieces: [
          { slot: 'Head', name: 'Seregios Helm α', slots: [2,0,0], skills: [['Bladescale Honing',1]] },
          { slot: 'Chest', name: 'Seregios Mail α', slots: [1,1,0], skills: [['Bladescale Honing',1],['Constitution',1]] },
          { slot: 'Arms', name: 'Seregios Vambraces α', slots: [1,0,0], skills: [['Counterstrike',1],['Recovery Up',1]] },
          { slot: 'Waist', name: 'Seregios Coil α', slots: [2,0,0], skills: [['Bladescale Honing',1]] },
          { slot: 'Legs', name: 'Seregios Greaves α', slots: [2,1,0], skills: [['Counterstrike',1]] }
        ]
      },
      'β': {
        group: { name: 'Battle Prowess', tiers: [['Counterstrike', 3]] },
        pieces: [
          { slot: 'Head', name: 'Seregios Helm β', slots: [3,0,0], skills: [['Bladescale Honing',1]] },
          { slot: 'Chest', name: 'Seregios Mail β', slots: [2,1,0], skills: [['Bladescale Honing',1]] },
          { slot: 'Arms', name: 'Seregios Vambraces β', slots: [2,1,0], skills: [['Counterstrike',1]] },
          { slot: 'Waist', name: 'Seregios Coil β', slots: [3,0,0], skills: [['Bladescale Honing',1]] },
          { slot: 'Legs', name: 'Seregios Greaves β', slots: [3,1,0], skills: [['Recovery Up',1]] }
        ]
      }
    }
  },
  {
    id: 'rathalos', set: 'Rathalos', element: 'Fire', tag: 'α / β', rarity: 6, verified: true,
    blurb: 'Rathalos — Evade Window 6, Rathalos\'s Flare 5, Scaling Prowess 5. Slots & per-piece skills verified against game data (Excel source).',
    bonus: { name: 'Rathalos\'s Flare', tiers: [['Scorcher I', 2], ['Scorcher II', 4]] },
    variants: {
      'α': {
        group: { name: 'Scaling Prowess', tiers: [['Master Mounter', 3]] },
        pieces: [
          { slot: 'Head', name: 'Rathalos Helm α', slots: [2,1,0], skills: [['Rathalos\'s Flare',1],['Evade Window',2],['Constitution',1]] },
          { slot: 'Chest', name: 'Rathalos Mail α', slots: [1,0,0], skills: [['Rathalos\'s Flare',1],['Adrenaline Rush',2],['Constitution',1]] },
          { slot: 'Arms', name: 'Rathalos Vambraces α', slots: [2,1,0], skills: [['Rathalos\'s Flare',1],['Constitution',2],['Evade Window',1]] },
          { slot: 'Waist', name: 'Rathalos Coil α', slots: [0,0,0], skills: [['Rathalos\'s Flare',1],['Adrenaline Rush',2],['Evade Window',1]] },
          { slot: 'Legs', name: 'Rathalos Greaves α', slots: [1,1,0], skills: [['Rathalos\'s Flare',1],['Evade Window',2],['Adrenaline Rush',1]] }
        ]
      },
      'β': {
        group: { name: 'Scale Layering', tiers: [['Adrenaline', 3]] },
        pieces: [
          { slot: 'Head', name: 'Rathalos Helm β', slots: [2,2,1], skills: [['Rathalos\'s Flare',1],['Evade Window',1],['Constitution',1]] },
          { slot: 'Chest', name: 'Rathalos Mail β', slots: [2,1,0], skills: [['Rathalos\'s Flare',1],['Adrenaline Rush',2]] },
          { slot: 'Arms', name: 'Rathalos Vambraces β', slots: [3,2,1], skills: [['Rathalos\'s Flare',1],['Constitution',2]] },
          { slot: 'Waist', name: 'Rathalos Coil β', slots: [1,1,0], skills: [['Rathalos\'s Flare',1],['Adrenaline Rush',2]] },
          { slot: 'Legs', name: 'Rathalos Greaves β', slots: [3,2,2], skills: [['Rathalos\'s Flare',1],['Evade Window',2]] }
        ]
      }
    }
  },
  {
    id: 'rathian', set: 'Rathian', element: 'Fire', tag: 'α / β', rarity: 6, verified: true,
    blurb: 'Rathian — Scaling Prowess 5, Foray 5, Divine Blessing 3. Slots & per-piece skills verified against game data (Excel source).',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Scaling Prowess', tiers: [['Master Mounter', 3]] },
        pieces: [
          { slot: 'Head', name: 'Rathian Helm α', slots: [1,1,0], skills: [['Divine Blessing',1],['Recovery Speed',1]] },
          { slot: 'Chest', name: 'Rathian Mail α', slots: [0,0,0], skills: [['Foray',2]] },
          { slot: 'Arms', name: 'Rathian Vambraces α', slots: [0,0,0], skills: [['Foray',1],['Divine Blessing',2]] },
          { slot: 'Waist', name: 'Rathian Coil α', slots: [0,0,0], skills: [['Foray',1],['Tool Specialist',1]] },
          { slot: 'Legs', name: 'Rathian Greaves α', slots: [0,0,0], skills: [['Foray',1],['Recovery Speed',2]] }
        ]
      },
      'β': {
        group: { name: 'Scale Layering', tiers: [['Adrenaline', 3]] },
        pieces: [
          { slot: 'Head', name: 'Rathian Helm β', slots: [2,1,1], skills: [['Divine Blessing',1]] },
          { slot: 'Chest', name: 'Rathian Mail β', slots: [3,2,1], skills: [['Foray',1]] },
          { slot: 'Arms', name: 'Rathian Vambraces β', slots: [1,0,0], skills: [['Foray',1],['Divine Blessing',1]] },
          { slot: 'Waist', name: 'Rathian Coil β', slots: [1,1,0], skills: [['Foray',1]] },
          { slot: 'Legs', name: 'Rathian Greaves β', slots: [1,0,0], skills: [['Foray',1],['Recovery Speed',1]] }
        ]
      }
    }
  },
  {
    id: 'g-rathalos', set: 'Guardian Rathalos', element: 'Fire', tag: 'α / β', rarity: 8, verified: true,
    blurb: 'Guardian Rathalos — Rathalos\'s Flare 5, Guardian\'s Pulse 5, Weakness Exploit 5. Slots & per-piece skills verified against game data (Excel source).',
    bonus: { name: 'Rathalos\'s Flare', tiers: [['Scorcher I', 2], ['Scorcher II', 4]] },
    variants: {
      'α': {
        group: { name: 'Guardian\'s Pulse', tiers: [['Wylk Burst', 3]] },
        pieces: [
          { slot: 'Head', name: 'G. Rathalos Helm α', slots: [2,1,0], skills: [['Rathalos\'s Flare',1],['Weakness Exploit',1],['Survival Expert',2]] },
          { slot: 'Chest', name: 'G. Rathalos Mail α', slots: [1,0,0], skills: [['Rathalos\'s Flare',1],['Weakness Exploit',1],['Intimidator',2]] },
          { slot: 'Arms', name: 'G. Rathalos Vambraces α', slots: [1,1,0], skills: [['Rathalos\'s Flare',1],['Weakness Exploit',1],['Intimidator',1],['Survival Expert',1]] },
          { slot: 'Waist', name: 'G. Rathalos Coil α', slots: [2,1,0], skills: [['Rathalos\'s Flare',1],['Weakness Exploit',1],['Windproof',1]] },
          { slot: 'Legs', name: 'G. Rathalos Greaves α', slots: [1,0,0], skills: [['Rathalos\'s Flare',1],['Weakness Exploit',1],['Windproof',2]] }
        ]
      },
      'β': {
        group: { name: 'Guardian\'s Protection', tiers: [['Ward of Wyveria', 3]] },
        pieces: [
          { slot: 'Head', name: 'G. Rathalos Helm β', slots: [2,2,1], skills: [['Rathalos\'s Flare',1],['Weakness Exploit',1]] },
          { slot: 'Chest', name: 'G. Rathalos Mail β', slots: [1,1,0], skills: [['Rathalos\'s Flare',1],['Weakness Exploit',1],['Intimidator',1]] },
          { slot: 'Arms', name: 'G. Rathalos Vambraces β', slots: [3,2,1], skills: [['Rathalos\'s Flare',1],['Weakness Exploit',1]] },
          { slot: 'Waist', name: 'G. Rathalos Coil β', slots: [3,2,2], skills: [['Rathalos\'s Flare',1],['Windproof',1]] },
          { slot: 'Legs', name: 'G. Rathalos Greaves β', slots: [1,1,0], skills: [['Rathalos\'s Flare',1],['Weakness Exploit',1],['Windproof',1]] }
        ]
      }
    }
  },
  {
    id: 'g-doshaguma', set: 'Guardian Doshaguma', element: 'None', tag: 'α / β', rarity: 8, verified: true,
    blurb: 'Guardian Doshaguma — Doshaguma\'s Might 5, Guardian\'s Pulse 5, Heroics 5. Slots & per-piece skills verified against game data (Excel source).',
    bonus: { name: 'Doshaguma\'s Might', tiers: [['Powerhouse I', 2], ['Powerhouse II', 4]] },
    variants: {
      'α': {
        group: { name: 'Guardian\'s Pulse', tiers: [['Wylk Burst', 3]] },
        pieces: [
          { slot: 'Head', name: 'G. Doshaguma Helm α', slots: [2,1,1], skills: [['Doshaguma\'s Might',1],['Heroics',1],['Hunger Resistance',2]] },
          { slot: 'Chest', name: 'G. Doshaguma Mail α', slots: [2,1,1], skills: [['Doshaguma\'s Might',1],['Constitution',2],['Iron Skin',1]] },
          { slot: 'Arms', name: 'G. Doshaguma Braces α', slots: [3,2,1], skills: [['Doshaguma\'s Might',1],['Heroics',1],['Iron Skin',2]] },
          { slot: 'Waist', name: 'G. Doshaguma Coil α', slots: [1,1,0], skills: [['Doshaguma\'s Might',1],['Heroics',2],['Hunger Resistance',1]] },
          { slot: 'Legs', name: 'G. Doshaguma Greaves α', slots: [1,1,0], skills: [['Doshaguma\'s Might',1],['Heroics',1],['Constitution',2]] }
        ]
      },
      'β': {
        group: { name: 'Guardian\'s Protection', tiers: [['Ward of Wyveria', 3]] },
        pieces: [
          { slot: 'Head', name: 'G. Doshaguma Helm β', slots: [3,2,2], skills: [['Doshaguma\'s Might',1],['Heroics',1]] },
          { slot: 'Chest', name: 'G. Doshaguma Mail β', slots: [2,2,1], skills: [['Doshaguma\'s Might',1],['Constitution',2]] },
          { slot: 'Arms', name: 'G. Doshaguma Braces β', slots: [3,2,2], skills: [['Doshaguma\'s Might',1],['Heroics',1]] },
          { slot: 'Waist', name: 'G. Doshaguma Coil β', slots: [2,1,1], skills: [['Doshaguma\'s Might',1],['Heroics',2]] },
          { slot: 'Legs', name: 'G. Doshaguma Greaves β', slots: [2,1,1], skills: [['Doshaguma\'s Might',1],['Heroics',1],['Constitution',1]] }
        ]
      }
    }
  },
  {
    id: 'g-ebony', set: 'Guardian Ebony Odogaron', element: 'Dragon', tag: 'α / β', rarity: 8, verified: true,
    blurb: 'Guardian Ebony Odogaron — Ebony Odogaron\'s Power 5, Guardian\'s Pulse 5, Burst 5. Slots & per-piece skills verified against game data (Excel source).',
    bonus: { name: 'Ebony Odogaron\'s Power', tiers: [['Burst Boost I', 2], ['Burst Boost II', 4]] },
    variants: {
      'α': {
        group: { name: 'Guardian\'s Pulse', tiers: [['Wylk Burst', 3]] },
        pieces: [
          { slot: 'Head', name: 'G. Ebony Helm α', slots: [0,0,0], skills: [['Ebony Odogaron\'s Power',1],['Burst',2],['Earplugs',1]] },
          { slot: 'Chest', name: 'G. Ebony Mail α', slots: [1,1,0], skills: [['Ebony Odogaron\'s Power',1],['Earplugs',1],['Bleeding Resistance',2]] },
          { slot: 'Arms', name: 'G. Ebony Braces α', slots: [0,0,0], skills: [['Ebony Odogaron\'s Power',1],['Burst',2],['Divine Blessing',1]] },
          { slot: 'Waist', name: 'G. Ebony Coil α', slots: [1,1,0], skills: [['Ebony Odogaron\'s Power',1],['Burst',1],['Bleeding Resistance',1]] },
          { slot: 'Legs', name: 'G. Ebony Greaves α', slots: [1,1,0], skills: [['Ebony Odogaron\'s Power',1],['Earplugs',1],['Divine Blessing',2]] }
        ]
      },
      'β': {
        group: { name: 'Guardian\'s Protection', tiers: [['Ward of Wyveria', 3]] },
        pieces: [
          { slot: 'Head', name: 'G. Ebony Helm β', slots: [1,1,0], skills: [['Ebony Odogaron\'s Power',1],['Burst',2]] },
          { slot: 'Chest', name: 'G. Ebony Mail β', slots: [2,2,1], skills: [['Ebony Odogaron\'s Power',1],['Earplugs',1]] },
          { slot: 'Arms', name: 'G. Ebony Braces β', slots: [2,1,1], skills: [['Ebony Odogaron\'s Power',1],['Burst',1],['Divine Blessing',1]] },
          { slot: 'Waist', name: 'G. Ebony Coil β', slots: [2,1,1], skills: [['Ebony Odogaron\'s Power',1],['Burst',1]] },
          { slot: 'Legs', name: 'G. Ebony Greaves β', slots: [2,1,1], skills: [['Ebony Odogaron\'s Power',1],['Earplugs',1],['Divine Blessing',1]] }
        ]
      }
    }
  },
  {
    id: 'g-fulgur', set: 'Guardian Fulgur Anjanath', element: 'Thunder', tag: 'α / β', rarity: 8, verified: true,
    blurb: 'Guardian Fulgur Anjanath — Fulgur Anjanath\'s Will 5, Guardian\'s Pulse 5, Agitator 3. Slots & per-piece skills verified against game data (Excel source).',
    bonus: { name: 'Fulgur Anjanath\'s Will', tiers: [['Second Wind I', 2], ['Second Wind II', 4]] },
    variants: {
      'α': {
        group: { name: 'Guardian\'s Pulse', tiers: [['Wylk Burst', 3]] },
        pieces: [
          { slot: 'Head', name: 'G. Fulgur Helm α', slots: [0,0,0], skills: [['Fulgur Anjanath\'s Will',1],['Agitator',2],['Coalescence',1]] },
          { slot: 'Chest', name: 'G. Fulgur Mail α', slots: [1,1,0], skills: [['Fulgur Anjanath\'s Will',1],['Maximum Might',1],['Coalescence',1]] },
          { slot: 'Arms', name: 'G. Fulgur Vambraces α', slots: [1,0,0], skills: [['Fulgur Anjanath\'s Will',1],['Maximum Might',1],['Agitator',1]] },
          { slot: 'Waist', name: 'G. Fulgur Coil α', slots: [2,1,0], skills: [['Fulgur Anjanath\'s Will',1],['Stamina Surge',1],['Maximum Might',1]] },
          { slot: 'Legs', name: 'G. Fulgur Greaves α', slots: [1,0,0], skills: [['Fulgur Anjanath\'s Will',1],['Coalescence',1],['Stamina Surge',2]] }
        ]
      },
      'β': {
        group: { name: 'Guardian\'s Protection', tiers: [['Ward of Wyveria', 3]] },
        pieces: [
          { slot: 'Head', name: 'G. Fulgur Helm β', slots: [1,1,0], skills: [['Fulgur Anjanath\'s Will',1],['Agitator',2]] },
          { slot: 'Chest', name: 'G. Fulgur Mail β', slots: [3,2,1], skills: [['Fulgur Anjanath\'s Will',1],['Maximum Might',1]] },
          { slot: 'Arms', name: 'G. Fulgur Vambraces β', slots: [2,2,1], skills: [['Fulgur Anjanath\'s Will',1],['Maximum Might',1]] },
          { slot: 'Waist', name: 'G. Fulgur Coil β', slots: [2,2,1], skills: [['Fulgur Anjanath\'s Will',1],['Stamina Surge',1]] },
          { slot: 'Legs', name: 'G. Fulgur Greaves β', slots: [2,1,1], skills: [['Fulgur Anjanath\'s Will',1],['Coalescence',1],['Stamina Surge',1]] }
        ]
      }
    }
  },
  {
    id: 'xu-wu', set: 'Xu Wu', element: 'Dragon', tag: 'α / β', rarity: 8, verified: true,
    blurb: 'Xu Wu — Xu Wu\'s Vigor 5, Flexible Leathercraft 5, Heroics 5. Slots & per-piece skills verified against game data (Excel source).',
    bonus: { name: 'Xu Wu\'s Vigor', tiers: [['Protein Fiend I', 2], ['Protein Fiend II', 4]] },
    variants: {
      'α': {
        group: { name: 'Flexible Leathercraft', tiers: [['Hunter Gatherer', 3]] },
        pieces: [
          { slot: 'Head', name: 'Xu Wu Helm α', slots: [1,0,0], skills: [['Xu Wu\'s Vigor',1],['Adrenaline Rush',2],['Ambush',1]] },
          { slot: 'Chest', name: 'Xu Wu Mail α', slots: [0,0,0], skills: [['Xu Wu\'s Vigor',1],['Heroics',3],['Ambush',1]] },
          { slot: 'Arms', name: 'Xu Wu Vambraces α', slots: [2,1,1], skills: [['Xu Wu\'s Vigor',1],['Earplugs',2]] },
          { slot: 'Waist', name: 'Xu Wu Coil α', slots: [1,1,0], skills: [['Xu Wu\'s Vigor',1],['Earplugs',1],['Heroics',2]] },
          { slot: 'Legs', name: 'Xu Wu Greaves α', slots: [2,1,1], skills: [['Xu Wu\'s Vigor',1],['Adrenaline Rush',1],['Ambush',1]] }
        ]
      },
      'β': {
        group: { name: 'Buttery Leathercraft', tiers: [['Affinity Sliding', 3]] },
        pieces: [
          { slot: 'Head', name: 'Xu Wu Helm β', slots: [2,1,1], skills: [['Xu Wu\'s Vigor',1],['Adrenaline Rush',2]] },
          { slot: 'Chest', name: 'Xu Wu Mail β', slots: [2,1,0], skills: [['Xu Wu\'s Vigor',1],['Heroics',3]] },
          { slot: 'Arms', name: 'Xu Wu Vambraces β', slots: [3,2,2], skills: [['Xu Wu\'s Vigor',1],['Earplugs',1]] },
          { slot: 'Waist', name: 'Xu Wu Coil β', slots: [3,2,1], skills: [['Xu Wu\'s Vigor',1],['Earplugs',1],['Heroics',1]] },
          { slot: 'Legs', name: 'Xu Wu Greaves β', slots: [3,2,2], skills: [['Xu Wu\'s Vigor',1],['Adrenaline Rush',1]] }
        ]
      }
    }
  },
  {
    id: 'jin-dahaad-g', set: 'Jin Dahaad', element: 'Ice', tag: 'γ', rarity: 8, verified: true,
    blurb: 'Arch-Tempered Jin Dahaad γ — endgame offense chassis with Agitator 5, Weakness Exploit 3, Foray 3 and Coalescence 3, plus the Lord\'s Soul group skill.',
    bonus: { name: 'Jin Dahaad\'s Revolt', tiers: [['Binding Counter I', 2], ['Binding Counter II', 4]] },
    variants: {
      'γ': {
        group: { name: 'Lord\'s Soul', tiers: [['Guts (Tenacity)', 3]] },
        pieces: [
          { slot: 'Head', name: 'Dahaad Shardhelm γ', slots: [3,3,0], skills: [['Jin Dahaad\'s Revolt',1],['Lord\'s Soul',1],['Foray',2]] },
          { slot: 'Chest', name: 'Dahaad Shardmail γ', slots: [2,2,0], skills: [['Jin Dahaad\'s Revolt',1],['Lord\'s Soul',1],['Agitator',2]] },
          { slot: 'Arms', name: 'Dahaad Shardbraces γ', slots: [2,0,0], skills: [['Jin Dahaad\'s Revolt',1],['Lord\'s Soul',1],['Coalescence',3],['Weakness Exploit',1]] },
          { slot: 'Waist', name: 'Dahaad Shardcoil γ', slots: [1,0,0], skills: [['Jin Dahaad\'s Revolt',1],['Lord\'s Soul',1],['Agitator',3],['Bind Resistance',2]] },
          { slot: 'Legs', name: 'Dahaad Shardgreaves γ', slots: [2,0,0], skills: [['Jin Dahaad\'s Revolt',1],['Lord\'s Soul',1],['Weakness Exploit',2],['Foray',1]] }
        ]
      }
    }
  },
  {
    id: 'jin-dahaad', set: 'Jin Dahaad', element: 'Ice', tag: 'α / β', rarity: 8, verified: true,
    blurb: 'Jin Dahaad — Jin Dahaad\'s Revolt 5, Lord\'s Favor 5, Agitator 5. Slots & per-piece skills verified against game data (Excel source).',
    bonus: { name: 'Jin Dahaad\'s Revolt', tiers: [['Binding Counter I', 2], ['Binding Counter II', 4]] },
    variants: {
      'α': {
        group: { name: 'Lord\'s Favor', tiers: [['Inspiration', 3]] },
        pieces: [
          { slot: 'Head', name: 'Dahaad Shardhelm α', slots: [1,0,0], skills: [['Jin Dahaad\'s Revolt',1],['Agitator',1],['Weakness Exploit',1]] },
          { slot: 'Chest', name: 'Dahaad Shardmail α', slots: [2,1,1], skills: [['Jin Dahaad\'s Revolt',1],['Adaptability',1],['Bind Resistance',2]] },
          { slot: 'Arms', name: 'Dahaad Shardbraces α', slots: [0,0,0], skills: [['Jin Dahaad\'s Revolt',1],['Agitator',2],['Adaptability',1]] },
          { slot: 'Waist', name: 'Dahaad Shardcoil α', slots: [2,1,0], skills: [['Jin Dahaad\'s Revolt',1],['Weakness Exploit',1],['Tremor Resistance',2]] },
          { slot: 'Legs', name: 'Dahaad Shardgreaves α', slots: [1,0,0], skills: [['Jin Dahaad\'s Revolt',1],['Agitator',2],['Tremor Resistance',1]] }
        ]
      },
      'β': {
        group: { name: 'Lord\'s Fury', tiers: [['Resuscitate', 3]] },
        pieces: [
          { slot: 'Head', name: 'Dahaad Shardhelm β', slots: [2,2,1], skills: [['Jin Dahaad\'s Revolt',1],['Agitator',1]] },
          { slot: 'Chest', name: 'Dahaad Shardmail β', slots: [2,2,1], skills: [['Jin Dahaad\'s Revolt',1],['Adaptability',1],['Bind Resistance',1]] },
          { slot: 'Arms', name: 'Dahaad Shardbraces β', slots: [1,1,1], skills: [['Jin Dahaad\'s Revolt',1],['Agitator',1],['Adaptability',1]] },
          { slot: 'Waist', name: 'Dahaad Shardcoil β', slots: [3,2,1], skills: [['Jin Dahaad\'s Revolt',1],['Weakness Exploit',1],['Tremor Resistance',1]] },
          { slot: 'Legs', name: 'Dahaad Shardgreaves β', slots: [1,1,0], skills: [['Jin Dahaad\'s Revolt',1],['Agitator',2]] }
        ]
      }
    }
  },
  {
    id: 'blango', set: 'Blangonga', element: 'Ice', tag: 'α / β', rarity: 7, verified: true,
    blurb: 'Blangonga — Blangonga\'s Spirit 5, Fortifying Pelt 5, Agitator 5. Slots & per-piece skills verified against game data (Excel source).',
    bonus: { name: 'Blangonga\'s Spirit', tiers: [['War Cry I', 2], ['War Cry II', 4]] },
    variants: {
      'α': {
        group: { name: 'Fortifying Pelt', tiers: [['Fortify', 3]] },
        pieces: [
          { slot: 'Head', name: 'Blango Helm α', slots: [2,1,0], skills: [['Blangonga\'s Spirit',1],['Wide-Range',2],['Counterstrike',1]] },
          { slot: 'Chest', name: 'Blango Mail α', slots: [0,0,0], skills: [['Blangonga\'s Spirit',1],['Agitator',2],['Item Prolonger',2]] },
          { slot: 'Arms', name: 'Blango Vambraces α', slots: [1,1,0], skills: [['Blangonga\'s Spirit',1],['Counterstrike',1],['Palico Rally',2]] },
          { slot: 'Waist', name: 'Blango Coil α', slots: [1,0,0], skills: [['Blangonga\'s Spirit',1],['Agitator',2],['Wide-Range',1]] },
          { slot: 'Legs', name: 'Blango Greaves α', slots: [2,1,0], skills: [['Blangonga\'s Spirit',1],['Agitator',1],['Counterstrike',1]] }
        ]
      },
      'β': {
        group: { name: 'Alluring Pelt', tiers: [['Diversion', 3]] },
        pieces: [
          { slot: 'Head', name: 'Blango Helm β', slots: [3,2,1], skills: [['Blangonga\'s Spirit',1],['Wide-Range',2]] },
          { slot: 'Chest', name: 'Blango Mail β', slots: [1,1,0], skills: [['Blangonga\'s Spirit',1],['Agitator',2]] },
          { slot: 'Arms', name: 'Blango Vambraces β', slots: [2,2,1], skills: [['Blangonga\'s Spirit',1],['Counterstrike',1]] },
          { slot: 'Waist', name: 'Blango Coil β', slots: [2,1,0], skills: [['Blangonga\'s Spirit',1],['Agitator',2]] },
          { slot: 'Legs', name: 'Blango Greaves β', slots: [2,2,1], skills: [['Blangonga\'s Spirit',1],['Agitator',1]] }
        ]
      }
    }
  },
  {
    id: 'yian-kut-ku', set: 'Yian Kut-Ku', element: 'Fire', tag: 'α / β', rarity: 6, verified: true,
    blurb: 'Yian Kut-Ku — Scaling Prowess 5, Constitution 5, Fire Resistance 3. Slots & per-piece skills verified against game data (Excel source).',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Scaling Prowess', tiers: [['Master Mounter', 3]] },
        pieces: [
          { slot: 'Head', name: 'Kut-Ku Helm α', slots: [1,0,0], skills: [['Constitution',2],['Fire Resistance',2]] },
          { slot: 'Chest', name: 'Kut-Ku Mail α', slots: [1,0,0], skills: [['Agitator',1],['Fire Resistance',1]] },
          { slot: 'Arms', name: 'Kut-Ku Vambraces α', slots: [1,0,0], skills: [['Constitution',1],['Agitator',1]] },
          { slot: 'Waist', name: 'Kut-Ku Coil α', slots: [0,0,0], skills: [['Agitator',1],['Recovery Up',2]] },
          { slot: 'Legs', name: 'Kut-Ku Greaves α', slots: [1,1,0], skills: [['Constitution',2],['Recovery Up',1]] }
        ]
      },
      'β': {
        group: { name: 'Scale Layering', tiers: [['Adrenaline', 3]] },
        pieces: [
          { slot: 'Head', name: 'Kut-Ku Helm β', slots: [2,1,1], skills: [['Constitution',2]] },
          { slot: 'Chest', name: 'Kut-Ku Mail β', slots: [1,1,0], skills: [['Agitator',1]] },
          { slot: 'Arms', name: 'Kut-Ku Vambraces β', slots: [3,2,1], skills: [['Constitution',1]] },
          { slot: 'Waist', name: 'Kut-Ku Coil β', slots: [1,0,0], skills: [['Agitator',1],['Recovery Up',1]] },
          { slot: 'Legs', name: 'Kut-Ku Greaves β', slots: [2,1,1], skills: [['Constitution',1],['Recovery Up',1]] }
        ]
      }
    }
  },
  {
    id: 'guild-ace', set: 'Guild Ace', element: 'None', tag: 'α', rarity: 8, verified: true,
    blurb: 'Guild Ace — Peak Performance 5, Foray 5, Constitution 5. Slots & per-piece skills verified against game data (Excel source).',
    bonus: null,
    variants: {
      'α': {
        group: null,
        pieces: [
          { slot: 'Head', name: 'Guild Ace Earrings α', slots: [1,1,1], skills: [['Peak Performance',1],['Foray',1],['Constitution',1]] },
          { slot: 'Chest', name: 'Guild Ace Mail α', slots: [1,1,1], skills: [['Peak Performance',1],['Foray',1],['Constitution',1]] },
          { slot: 'Arms', name: 'Guild Ace Vambraces α', slots: [1,1,1], skills: [['Peak Performance',1],['Foray',1],['Constitution',1]] },
          { slot: 'Waist', name: 'Guild Ace Coil α', slots: [1,1,1], skills: [['Peak Performance',1],['Foray',1],['Constitution',1]] },
          { slot: 'Legs', name: 'Guild Ace Boots α', slots: [1,1,1], skills: [['Peak Performance',1],['Foray',1],['Constitution',1]] }
        ]
      }
    }
  },
  {
    id: 'dober', set: 'Dober', element: 'Dragon', tag: 'α', rarity: 7, verified: true,
    blurb: 'Dober — Constitution 5, Stamina Surge 3, Marathon Runner 3. Slots & per-piece skills verified against game data (Excel source).',
    bonus: null,
    variants: {
      'α': {
        group: null,
        pieces: [
          { slot: 'Head', name: 'Dober Helm α', slots: [1,1,1], skills: [['Constitution',1],['Stamina Surge',1]] },
          { slot: 'Chest', name: 'Dober Mail α', slots: [2,2,1], skills: [['Constitution',1],['Marathon Runner',1]] },
          { slot: 'Arms', name: 'Dober Vambraces α', slots: [1,1,1], skills: [['Constitution',1],['Stamina Surge',2]] },
          { slot: 'Waist', name: 'Dober Coil α', slots: [2,1,1], skills: [['Constitution',1],['Marathon Runner',2]] },
          { slot: 'Legs', name: 'Dober Greaves α', slots: [2,2,1], skills: [['Constitution',1],['Mushroomancer',2]] }
        ]
      }
    }
  },
  {
    id: 'chatacabra', set: 'Chatacabra', element: 'None', tag: 'α / β', rarity: 5, verified: true,
    blurb: 'Chatacabra — Flexible Leathercraft 5, Speed Eating 3, Item Prolonger 3. Slots & per-piece skills verified against game data (Excel source).',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Flexible Leathercraft', tiers: [['Hunter Gatherer', 3]] },
        pieces: [
          { slot: 'Head', name: 'Chatacabra Helm α', slots: [1,0,0], skills: [['Speed Eating',1],['Wide-Range',1]] },
          { slot: 'Chest', name: 'Chatacabra Mail α', slots: [0,0,0], skills: [['Speed Eating',1],['Weakness Exploit',1]] },
          { slot: 'Arms', name: 'Chatacabra Vambraces α', slots: [1,0,0], skills: [['Item Prolonger',1],['Wide-Range',1]] },
          { slot: 'Waist', name: 'Chatacabra Coil α', slots: [1,0,0], skills: [['Speed Eating',1],['Item Prolonger',1]] },
          { slot: 'Legs', name: 'Chatacabra Greaves α', slots: [0,0,0], skills: [['Item Prolonger',1],['Weakness Exploit',1]] }
        ]
      },
      'β': {
        group: { name: 'Buttery Leathercraft', tiers: [['Affinity Sliding', 3]] },
        pieces: [
          { slot: 'Head', name: 'Chatacabra Helm β', slots: [1,1,0], skills: [['Speed Eating',1]] },
          { slot: 'Chest', name: 'Chatacabra Mail β', slots: [3,2,1], skills: [['Speed Eating',1]] },
          { slot: 'Arms', name: 'Chatacabra Vambraces β', slots: [1,1,0], skills: [['Item Prolonger',1]] },
          { slot: 'Waist', name: 'Chatacabra Coil β', slots: [2,1,0], skills: [['Speed Eating',1]] },
          { slot: 'Legs', name: 'Chatacabra Greaves β', slots: [1,0,0], skills: [['Weakness Exploit',1]] }
        ]
      }
    }
  },
  {
    id: 'quematrice', set: 'Quematrice', element: 'Fire', tag: 'α / β', rarity: 5, verified: true,
    blurb: 'Quematrice — Scaling Prowess 5, Flinch Free 3, Latent Power 3. Slots & per-piece skills verified against game data (Excel source).',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Scaling Prowess', tiers: [['Master Mounter', 3]] },
        pieces: [
          { slot: 'Head', name: 'Quematrice Helm α', slots: [1,0,0], skills: [['Flinch Free',1],['Latent Power',1]] },
          { slot: 'Chest', name: 'Quematrice Mail α', slots: [0,0,0], skills: [['Fire Resistance',1],['Latent Power',1]] },
          { slot: 'Arms', name: 'Quematrice Braces α', slots: [2,1,0], skills: [['Flinch Free',1],['Fire Resistance',1]] },
          { slot: 'Waist', name: 'Quematrice Coil α', slots: [0,0,0], skills: [['Fire Resistance',1],['Latent Power',1]] },
          { slot: 'Legs', name: 'Quematrice Greaves α', slots: [1,0,0], skills: [['Flinch Free',1],['Evade Extender',1]] }
        ]
      },
      'β': {
        group: { name: 'Scale Layering', tiers: [['Adrenaline', 3]] },
        pieces: [
          { slot: 'Head', name: 'Quematrice Helm β', slots: [1,1,0], skills: [['Latent Power',1]] },
          { slot: 'Chest', name: 'Quematrice Mail β', slots: [1,0,0], skills: [['Latent Power',1]] },
          { slot: 'Arms', name: 'Quematrice Braces β', slots: [2,1,1], skills: [['Flinch Free',1]] },
          { slot: 'Waist', name: 'Quematrice Coil β', slots: [1,1,0], skills: [['Fire Resistance',2]] },
          { slot: 'Legs', name: 'Quematrice Greaves β', slots: [3,2,1], skills: [['Flinch Free',1]] }
        ]
      }
    }
  },
  {
    id: 'lala-barina', set: 'Lala Barina', element: 'None', tag: 'α / β', rarity: 5, verified: true,
    blurb: 'Lala Barina — Neopteron Alert 5, Paralysis Resistance 3, Foray 3. Slots & per-piece skills verified against game data (Excel source).',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Neopteron Alert', tiers: [['Honey Hunter', 3]] },
        pieces: [
          { slot: 'Head', name: 'Barina Headgear α', slots: [0,0,0], skills: [['Paralysis Resistance',1],['Foray',1]] },
          { slot: 'Chest', name: 'Barina Mail α', slots: [0,0,0], skills: [['Recovery Up',2],['Evade Window',1]] },
          { slot: 'Arms', name: 'Barina Vambraces α', slots: [0,0,0], skills: [['Recovery Up',1],['Foray',1]] },
          { slot: 'Waist', name: 'Barina Coil α', slots: [1,1,0], skills: [['Paralysis Resistance',2]] },
          { slot: 'Legs', name: 'Barina Greaves α', slots: [0,0,0], skills: [['Evade Window',1],['Foray',1]] }
        ]
      },
      'β': {
        group: { name: 'Neopteron Camouflage', tiers: [['Fleetfoot', 3]] },
        pieces: [
          { slot: 'Head', name: 'Barina Headgear β', slots: [1,0,0], skills: [['Foray',1]] },
          { slot: 'Chest', name: 'Barina Mail β', slots: [1,0,0], skills: [['Recovery Up',1],['Evade Window',1]] },
          { slot: 'Arms', name: 'Barina Vambraces β', slots: [2,1,1], skills: [['Recovery Up',1]] },
          { slot: 'Waist', name: 'Barina Coil β', slots: [2,1,1], skills: [['Paralysis Resistance',1]] },
          { slot: 'Legs', name: 'Barina Greaves β', slots: [3,2,1], skills: [['Evade Window',1]] }
        ]
      }
    }
  },
  {
    id: 'congalala', set: 'Congalala', element: 'None', tag: 'α / β', rarity: 5, verified: true,
    blurb: 'Congalala — Fortifying Pelt 5, Intimidator 3, Mushroomancer 3. Slots & per-piece skills verified against game data (Excel source).',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Fortifying Pelt', tiers: [['Fortify', 3]] },
        pieces: [
          { slot: 'Head', name: 'Conga Helm α', slots: [1,0,0], skills: [['Intimidator',1],['Free Meal',1]] },
          { slot: 'Chest', name: 'Conga Mail α', slots: [0,0,0], skills: [['Intimidator',2],['Burst',1]] },
          { slot: 'Arms', name: 'Conga Vambraces α', slots: [0,0,0], skills: [['Mushroomancer',1],['Speed Eating',1]] },
          { slot: 'Waist', name: 'Conga Coil α', slots: [1,0,0], skills: [['Mushroomancer',1],['Free Meal',1]] },
          { slot: 'Legs', name: 'Conga Greaves α', slots: [0,0,0], skills: [['Mushroomancer',1],['Burst',1]] }
        ]
      },
      'β': {
        group: { name: 'Alluring Pelt', tiers: [['Diversion', 3]] },
        pieces: [
          { slot: 'Head', name: 'Conga Helm β', slots: [1,1,0], skills: [['Intimidator',1]] },
          { slot: 'Chest', name: 'Conga Mail β', slots: [3,2,1], skills: [['Intimidator',2]] },
          { slot: 'Arms', name: 'Conga Vambraces β', slots: [1,0,0], skills: [['Mushroomancer',1]] },
          { slot: 'Waist', name: 'Conga Coil β', slots: [1,1,0], skills: [['Mushroomancer',1]] },
          { slot: 'Legs', name: 'Conga Greaves β', slots: [1,1,0], skills: [['Burst',1]] }
        ]
      }
    }
  },
  {
    id: 'rompopolo', set: 'Rompopolo', element: 'None', tag: 'α / β', rarity: 5, verified: true,
    blurb: 'Rompopolo — Wide-Range 6, Flexible Leathercraft 5, Poison Resistance 3. Slots & per-piece skills verified against game data (Excel source).',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Flexible Leathercraft', tiers: [['Hunter Gatherer', 3]] },
        pieces: [
          { slot: 'Head', name: 'Rompopolo Helm α', slots: [2,1,0], skills: [['Wide-Range',2]] },
          { slot: 'Chest', name: 'Rompopolo Mail α', slots: [1,0,0], skills: [['Poison Resistance',2],['Wide-Range',1]] },
          { slot: 'Arms', name: 'Rompopolo Vambraces α', slots: [1,0,0], skills: [['Poison Resistance',1],['Earplugs',1]] },
          { slot: 'Waist', name: 'Rompopolo Coil α', slots: [0,0,0], skills: [['Wide-Range',1],['Foray',1]] },
          { slot: 'Legs', name: 'Rompopolo Greaves α', slots: [0,0,0], skills: [['Wide-Range',2],['Earplugs',1]] }
        ]
      },
      'β': {
        group: { name: 'Buttery Leathercraft', tiers: [['Affinity Sliding', 3]] },
        pieces: [
          { slot: 'Head', name: 'Rompopolo Helm β', slots: [2,1,1], skills: [['Wide-Range',1]] },
          { slot: 'Chest', name: 'Rompopolo Mail β', slots: [1,1,0], skills: [['Poison Resistance',2]] },
          { slot: 'Arms', name: 'Rompopolo Vambraces β', slots: [1,1,0], skills: [['Earplugs',1]] },
          { slot: 'Waist', name: 'Rompopolo Coil β', slots: [1,0,0], skills: [['Foray',1]] },
          { slot: 'Legs', name: 'Rompopolo Greaves β', slots: [1,1,0], skills: [['Wide-Range',2]] }
        ]
      }
    }
  },
  {
    id: 'gypceros', set: 'Gypceros', element: 'None', tag: 'α / β', rarity: 5, verified: true,
    blurb: 'Gypceros — Flexible Leathercraft 5, Resentment 4, Stamina Surge 3. Slots & per-piece skills verified against game data (Excel source).',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Flexible Leathercraft', tiers: [['Hunter Gatherer', 3]] },
        pieces: [
          { slot: 'Head', name: 'Gypceros Helm α', slots: [1,0,0], skills: [['Stamina Surge',1],['Blindsider',1]] },
          { slot: 'Chest', name: 'Gypceros Mail α', slots: [1,0,0], skills: [['Stamina Surge',1],['Poison Resistance',1]] },
          { slot: 'Arms', name: 'Gypceros Vambraces α', slots: [0,0,0], skills: [['Resentment',2],['Poison Resistance',1]] },
          { slot: 'Waist', name: 'Gypceros Coil α', slots: [1,0,0], skills: [['Stamina Surge',1],['Resentment',1]] },
          { slot: 'Legs', name: 'Gypceros Greaves α', slots: [0,0,0], skills: [['Resentment',1],['Marathon Runner',2]] }
        ]
      },
      'β': {
        group: { name: 'Buttery Leathercraft', tiers: [['Affinity Sliding', 3]] },
        pieces: [
          { slot: 'Head', name: 'Gypceros Helm β', slots: [2,1,0], skills: [['Stamina Surge',1]] },
          { slot: 'Chest', name: 'Gypceros Mail β', slots: [1,1,0], skills: [['Stamina Surge',1]] },
          { slot: 'Arms', name: 'Gypceros Vambraces β', slots: [1,0,0], skills: [['Resentment',2]] },
          { slot: 'Waist', name: 'Gypceros Coil β', slots: [2,1,1], skills: [['Stamina Surge',1]] },
          { slot: 'Legs', name: 'Gypceros Greaves β', slots: [1,0,0], skills: [['Resentment',1],['Marathon Runner',1]] }
        ]
      }
    }
  },
  {
    id: 'nerscylla', set: 'Nerscylla', element: 'None', tag: 'α', rarity: 5, verified: true,
    blurb: 'Nerscylla — Neopteron Alert 5, Poison Resistance 3, Ambush 3. Slots & per-piece skills verified against game data (Excel source).',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Neopteron Alert', tiers: [['Honey Hunter', 3]] },
        pieces: [
          { slot: 'Head', name: 'Nerscylla Helm α', slots: [0,0,0], skills: [['Bind Resistance',1],['Poison Resistance',2]] },
          { slot: 'Chest', name: 'Nerscylla Mail α', slots: [0,0,0], skills: [['Ambush',1],['Weakness Exploit',1]] },
          { slot: 'Arms', name: 'Nerscylla Vambraces α', slots: [1,0,0], skills: [['Ambush',1],['Poison Resistance',1]] },
          { slot: 'Waist', name: 'Nerscylla Coil α', slots: [0,0,0], skills: [['Bind Resistance',1],['Sleep Resistance',2]] },
          { slot: 'Legs', name: 'Nerscylla Greaves α', slots: [1,0,0], skills: [['Ambush',1],['Sleep Resistance',1]] }
        ]
      }
    }
  },
  {
    id: 'balahara', set: 'Balahara', element: 'Water', tag: 'α', rarity: 5, verified: true,
    blurb: 'Early-HR mobility set (Balahara, Windward Plains). Evade Extender 3 + Evade Window 2 with Stamina Surge and Geologist — a comfortable evasion/gathering chassis under the Scaling Prowess group skill (Master Mounter). (Base-game slots; full data from Monster Hunter Wiki.)',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Scaling Prowess', tiers: [['Master Mounter', 3]] },
        pieces: [
          { slot: 'Head', name: 'Balahara Helm α', slots: [1,0,0], skills: [['Evade Window',1],['Geologist',1]] },
          { slot: 'Chest', name: 'Balahara Mail α', slots: [1,0,0], skills: [['Stamina Surge',1],['Geologist',1]] },
          { slot: 'Arms', name: 'Balahara Vambraces α', slots: [0,0,0], skills: [['Stamina Surge',1],['Evade Extender',1]] },
          { slot: 'Waist', name: 'Balahara Coil α', slots: [0,0,0], skills: [['Evade Window',1],['Evade Extender',1]] },
          { slot: 'Legs', name: 'Balahara Greaves α', slots: [2,1,0], skills: [['Evade Extender',1],['Geologist',1]] }
        ]
      }
    }
  },
  {
    id: 'hirabami', set: 'Hirabami', element: 'Ice', tag: 'α', rarity: 5, verified: true,
    blurb: 'Hirabami — Scaling Prowess 5, Evade Window 5, Ice Resistance 3. Slots & per-piece skills verified against game data (Excel source).',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Scaling Prowess', tiers: [['Master Mounter', 3]] },
        pieces: [
          { slot: 'Head', name: 'Hirabami Headdress α', slots: [0,0,0], skills: [['Evade Window',1],['Evade Extender',1]] },
          { slot: 'Chest', name: 'Hirabami Mail α', slots: [1,0,0], skills: [['Ice Resistance',2],['Evade Window',1]] },
          { slot: 'Arms', name: 'Hirabami Vambraces α', slots: [0,0,0], skills: [['Evade Window',1],['Peak Performance',1]] },
          { slot: 'Waist', name: 'Hirabami Coil α', slots: [0,0,0], skills: [['Evade Window',2]] },
          { slot: 'Legs', name: 'Hirabami Greaves α', slots: [1,0,0], skills: [['Ice Resistance',1],['Peak Performance',1]] }
        ]
      }
    }
  },
  {
    id: 'uth-duna', set: 'Uth Duna', element: 'Water', tag: 'α', rarity: 7, verified: true,
    blurb: 'Uth Duna — Uth Duna\'s Cover 5, Lord\'s Favor 5, Tool Specialist 5. Slots & per-piece skills verified against game data (Excel source).',
    bonus: { name: 'Uth Duna\'s Cover', tiers: [['Protective Veil I', 2], ['Protective Veil II', 4]] },
    variants: {
      'α': {
        group: { name: 'Lord\'s Favor', tiers: [['Inspiration', 3]] },
        pieces: [
          { slot: 'Head', name: 'Duna Wildhelm α', slots: [2,1,1], skills: [['Uth Duna\'s Cover',1],['Tool Specialist',2],['Earplugs',1]] },
          { slot: 'Chest', name: 'Duna Wildmail α', slots: [1,1,1], skills: [['Uth Duna\'s Cover',1],['Tool Specialist',2],['Aquatic/Oilsilt Mobility',1]] },
          { slot: 'Arms', name: 'Duna Wildbraces α', slots: [2,1,1], skills: [['Uth Duna\'s Cover',1],['Peak Performance',2],['Quick Sheathe',1]] },
          { slot: 'Waist', name: 'Duna Wildcoil α', slots: [2,1,1], skills: [['Uth Duna\'s Cover',1],['Peak Performance',2],['Aquatic/Oilsilt Mobility',1]] },
          { slot: 'Legs', name: 'Duna Wildgreaves α', slots: [1,1,1], skills: [['Uth Duna\'s Cover',1],['Peak Performance',1],['Tool Specialist',1]] }
        ]
      }
    }
  },
  {
    id: 'alloy', set: 'Alloy', element: 'Water', tag: 'α', rarity: 6, verified: false,
    blurb: 'Alloy — Quick Sheathe 3, Flinch Free 3, Tremor Resistance 2. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: null,
        pieces: [
          { slot: 'Head', name: 'Alloy Helm α', slots: [2,1,0], skills: [['Quick Sheathe',1]] },
          { slot: 'Chest', name: 'Alloy Mail α', slots: [1,0,0], skills: [['Flinch Free',2]] },
          { slot: 'Arms', name: 'Alloy Vambraces α', slots: [2,1,0], skills: [['Tremor Resistance',1]] },
          { slot: 'Waist', name: 'Alloy Coil α', slots: [1,0,0], skills: [['Tremor Resistance',1],['Quick Sheathe',1]] },
          { slot: 'Legs', name: 'Alloy Greaves α', slots: [1,0,0], skills: [['Quick Sheathe',1],['Flinch Free',1]] }
        ]
      }
    }
  },
  {
    id: 'artian', set: 'Artian', element: 'Dragon', tag: 'α', rarity: 8, verified: false,
    blurb: 'Artian — Guardian\'s Protection 5, Flayer 5, Blight Resistance 2. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Guardian\'s Protection', tiers: [['Ward of Wyveria', 3]] },
        pieces: [
          { slot: 'Head', name: 'Artian Helm α', slots: [2,1,1], skills: [['Flayer',1],['Earplugs',1]] },
          { slot: 'Chest', name: 'Artian Mail α', slots: [3,2,1], skills: [['Flayer',1],['Adaptability',1]] },
          { slot: 'Arms', name: 'Artian Vambraces α', slots: [1,1,0], skills: [['Flayer',1],['Blight Resistance',2]] },
          { slot: 'Waist', name: 'Artian Coil α', slots: [1,1,0], skills: [['Flayer',1],['Windproof',2]] },
          { slot: 'Legs', name: 'Artian Greaves α', slots: [1,1,0], skills: [['Flayer',1],['Tremor Resistance',2]] }
        ]
      }
    }
  },
  {
    id: 'azuz', set: 'Azuz', element: 'Fire', tag: 'α', rarity: 8, verified: false,
    blurb: 'Azuz — partial set (3-piece). Imparted Wisdom 3, Heroics 3, Geologist 3. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Imparted Wisdom', tiers: [['Forager\'s Luck', 3]] },
        pieces: [
          { slot: 'Head', name: 'Azuz Headdress α', slots: [1,1,0], skills: [['Maximum Might',2]] },
          { slot: 'Chest', name: 'Azuz Apron α', slots: [2,1,0], skills: [['Heroics',3]] },
          { slot: 'Legs', name: 'Azuz Pants α', slots: [3,2,1], skills: [['Geologist',3]] }
        ]
      }
    }
  },
  {
    id: 'battle', set: 'Battle', element: 'Fire', tag: 'α', rarity: 6, verified: false,
    blurb: 'Battle — Imparted Wisdom 5, Hunger Resistance 3, Free Meal 3. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Imparted Wisdom', tiers: [['Forager\'s Luck', 3]] },
        pieces: [
          { slot: 'Head', name: 'Battle Helm α', slots: [1,1,0], skills: [['Stamina Surge',2]] },
          { slot: 'Chest', name: 'Battle Mail α', slots: [1,1,0], skills: [['Hunger Resistance',3],['Sleep Resistance',2]] },
          { slot: 'Arms', name: 'Battle Vambraces α', slots: [1,1,0], skills: [['Free Meal',3]] },
          { slot: 'Waist', name: 'Battle Coil α', slots: [1,1,0], skills: [['Item Prolonger',3],['Bind Resistance',2]] },
          { slot: 'Legs', name: 'Battle Greaves α', slots: [1,1,0], skills: [['Marathon Runner',3],['Constitution',2]] }
        ]
      }
    }
  },
  {
    id: 'bone', set: 'Bone', element: 'Fire', tag: 'α', rarity: 5, verified: false,
    blurb: 'Bone — Stun Resistance 3, Marathon Runner 3, Speed Eating 2. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: null,
        pieces: [
          { slot: 'Head', name: 'Bone Helm α', slots: [1,0,0], skills: [['Stun Resistance',1],['Speed Eating',1]] },
          { slot: 'Chest', name: 'Bone Mail α', slots: [1,0,0], skills: [['Marathon Runner',1],['Stun Resistance',1]] },
          { slot: 'Arms', name: 'Bone Vambraces α', slots: [1,0,0], skills: [['Marathon Runner',1],['Speed Eating',1]] },
          { slot: 'Waist', name: 'Bone Coil α', slots: [2,1,0], skills: [['Marathon Runner',1]] },
          { slot: 'Legs', name: 'Bone Greaves α', slots: [2,1,0], skills: [['Stun Resistance',1]] }
        ]
      }
    }
  },
  {
    id: 'bulaqchi', set: 'Bulaqchi', element: 'Dragon', tag: 'α / β', rarity: 5, verified: false,
    blurb: 'Bulaqchi — partial set (1-piece). Neopteron Alert 1, Entomologist 1, Weakness Exploit 1. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Neopteron Alert', tiers: [['Honey Hunter', 3]] },
        pieces: [
          { slot: 'Head', name: 'Bulaqchi Specs α', slots: [0,0,0], skills: [['Entomologist',1],['Weakness Exploit',1]] }
        ]
      },
      'β': {
        group: { name: 'Neopteron Camouflage', tiers: [['Fleetfoot', 3]] },
        pieces: [
          { slot: 'Head', name: 'Bulaqchi Specs β', slots: [2,1,1], skills: [['Entomologist',1]] }
        ]
      }
    }
  },
  {
    id: 'butterfly', set: 'Butterfly', element: 'Thunder', tag: 'α', rarity: 5, verified: false,
    blurb: 'Butterfly — Imparted Wisdom 5, Constitution 5, Evade Window 5. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Imparted Wisdom', tiers: [['Forager\'s Luck', 3]] },
        pieces: [
          { slot: 'Head', name: 'Butterfly Vertex α', slots: [1,1,0], skills: [['Constitution',1],['Evade Window',1],['Evade Extender',1]] },
          { slot: 'Chest', name: 'Butterfly Thorax α', slots: [1,1,0], skills: [['Constitution',1],['Evade Window',1],['Evade Extender',1]] },
          { slot: 'Arms', name: 'Butterfly Brachia α', slots: [1,1,0], skills: [['Constitution',1],['Evade Window',1],['Recovery Speed',2]] },
          { slot: 'Waist', name: 'Butterfly Elytra α', slots: [1,1,0], skills: [['Constitution',1],['Evade Window',1],['Evade Extender',1]] },
          { slot: 'Legs', name: 'Butterfly Crura α', slots: [1,1,0], skills: [['Constitution',1],['Evade Window',1],['Recovery Up',2]] }
        ]
      }
    }
  },
  {
    id: 'chainmail', set: 'Chainmail', element: 'Water', tag: 'α', rarity: 5, verified: false,
    blurb: 'Chainmail — Geologist 3, Recovery Speed 3, Ice Resistance 2. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: null,
        pieces: [
          { slot: 'Head', name: 'Chainmail Headgear α', slots: [2,1,0], skills: [['Geologist',1]] },
          { slot: 'Chest', name: 'Chainmail Armor α', slots: [1,0,0], skills: [['Geologist',1],['Ice Resistance',1]] },
          { slot: 'Arms', name: 'Chainmail Gloves α', slots: [1,0,0], skills: [['Geologist',1],['Recovery Speed',1]] },
          { slot: 'Waist', name: 'Chainmail Belt α', slots: [1,0,0], skills: [['Recovery Speed',1],['Ice Resistance',1]] },
          { slot: 'Legs', name: 'Chainmail Pants α', slots: [2,1,0], skills: [['Recovery Speed',1]] }
        ]
      }
    }
  },
  {
    id: 'comaqchi', set: 'Comaqchi', element: 'Ice', tag: 'α / β', rarity: 5, verified: false,
    blurb: 'Comaqchi — partial set (1-piece). Sleep Resistance 2, Neopteron Alert 1, Foray 1. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Neopteron Alert', tiers: [['Honey Hunter', 3]] },
        pieces: [
          { slot: 'Head', name: 'Comaqchi Accessory α', slots: [0,0,0], skills: [['Sleep Resistance',2],['Foray',1]] }
        ]
      },
      'β': {
        group: { name: 'Neopteron Camouflage', tiers: [['Fleetfoot', 3]] },
        pieces: [
          { slot: 'Head', name: 'Comaqchi Accessory β', slots: [2,1,1], skills: [['Sleep Resistance',2]] }
        ]
      }
    }
  },
  {
    id: 'commission', set: 'Commission', element: 'Fire', tag: 'α', rarity: 5, verified: false,
    blurb: 'Commission — Agitator 5, Divine Blessing 2, Quick Sheathe 2. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: null,
        pieces: [
          { slot: 'Head', name: 'Commission Helm α', slots: [1,0,0], skills: [['Agitator',1],['Maximum Might',1]] },
          { slot: 'Chest', name: 'Commission Mail α', slots: [1,0,0], skills: [['Agitator',1],['Divine Blessing',2]] },
          { slot: 'Arms', name: 'Commission Vambraces α', slots: [1,0,0], skills: [['Agitator',1],['Quick Sheathe',2]] },
          { slot: 'Waist', name: 'Commission Coil α', slots: [1,0,0], skills: [['Agitator',1],['Tool Specialist',1]] },
          { slot: 'Legs', name: 'Commission Greaves α', slots: [1,0,0], skills: [['Agitator',1],['Earplugs',1]] }
        ]
      }
    }
  },
  {
    id: 'damascus', set: 'Damascus', element: 'Fire', tag: 'α', rarity: 7, verified: false,
    blurb: 'Damascus — Wide-Range 5, Divine Blessing 3, Recovery Up 3. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: null,
        pieces: [
          { slot: 'Head', name: 'Damascus Helm α', slots: [2,1,1], skills: [['Wide-Range',1],['Divine Blessing',2]] },
          { slot: 'Chest', name: 'Damascus Mail α', slots: [2,2,1], skills: [['Wide-Range',1],['Recovery Up',2]] },
          { slot: 'Arms', name: 'Damascus Vambraces α', slots: [2,1,1], skills: [['Wide-Range',1],['Divine Blessing',1]] },
          { slot: 'Waist', name: 'Damascus Coil α', slots: [2,2,1], skills: [['Wide-Range',1],['Recovery Up',1]] },
          { slot: 'Legs', name: 'Damascus Greaves α', slots: [1,1,1], skills: [['Wide-Range',1],['Item Prolonger',2]] }
        ]
      }
    }
  },
  {
    id: 'death-stench', set: 'Death Stench', element: 'Dragon', tag: 'α', rarity: 6, verified: false,
    blurb: 'Death Stench — Imparted Wisdom 5, Resentment 5, Ambush 3. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Imparted Wisdom', tiers: [['Forager\'s Luck', 3]] },
        pieces: [
          { slot: 'Head', name: 'Death Stench Brain α', slots: [1,1,0], skills: [['Resentment',1],['Ambush',1]] },
          { slot: 'Chest', name: 'Death Stench Muscle α', slots: [1,1,0], skills: [['Resentment',1],['Ambush',1]] },
          { slot: 'Arms', name: 'Death Stench Grip α', slots: [1,1,0], skills: [['Resentment',1],['Ambush',1]] },
          { slot: 'Waist', name: 'Death Stench Bowels α', slots: [2,1,1], skills: [['Resentment',1],['Intimidator',2]] },
          { slot: 'Legs', name: 'Death Stench Heel α', slots: [2,1,1], skills: [['Resentment',1],['Stun Resistance',2]] }
        ]
      }
    }
  },
  {
    id: 'dragonking', set: 'Dragonking', element: 'None', tag: 'α', rarity: 8, verified: false,
    blurb: 'Dragonking — partial set (1-piece). Counterstrike 3. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: null,
        pieces: [
          { slot: 'Head', name: 'Dragonking Eyepatch α', slots: [0,0,0], skills: [['Counterstrike',3]] }
        ]
      }
    }
  },
  {
    id: 'expedition', set: 'Expedition', element: 'Fire', tag: 'α', rarity: 5, verified: false,
    blurb: 'Expedition — partial set (1-piece). Blight Resistance 1, Coalescence 1. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: null,
        pieces: [
          { slot: 'Head', name: 'Expedition Headgear α', slots: [1,0,0], skills: [['Blight Resistance',1],['Coalescence',1]] }
        ]
      }
    }
  },
  {
    id: 'gajau', set: 'Gajau', element: 'Water', tag: 'α', rarity: 5, verified: false,
    blurb: 'Gajau — partial set (1-piece). Flexible Leathercraft 1, Water Resistance 1, Outdoorsman 1. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Flexible Leathercraft', tiers: [['Hunter Gatherer', 3]] },
        pieces: [
          { slot: 'Legs', name: 'Gajau Boots α', slots: [3,2,1], skills: [['Water Resistance',1],['Outdoorsman',1]] }
        ]
      }
    }
  },
  {
    id: 'guardian-seikret', set: 'Guardian Seikret', element: 'Thunder', tag: 'α / β', rarity: 7, verified: false,
    blurb: 'Guardian Seikret — partial set (1-piece). Earplugs 2, Guardian\'s Pulse 1, Jump Master 1. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Guardian\'s Pulse', tiers: [['Wylk Burst', 3]] },
        pieces: [
          { slot: 'Waist', name: 'G. Seikret Coil α', slots: [1,0,0], skills: [['Jump Master',1],['Earplugs',2]] }
        ]
      },
      'β': {
        group: { name: 'Guardian\'s Protection', tiers: [['Ward of Wyveria', 3]] },
        pieces: [
          { slot: 'Waist', name: 'G. Seikret Coil β', slots: [2,1,1], skills: [['Jump Master',1],['Earplugs',1]] }
        ]
      }
    }
  },
  {
    id: 'high-metal', set: 'High Metal', element: 'Ice', tag: 'α', rarity: 6, verified: false,
    blurb: 'High Metal — Imparted Wisdom 5, Stun Resistance 3, Partbreaker 3. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Imparted Wisdom', tiers: [['Forager\'s Luck', 3]] },
        pieces: [
          { slot: 'Head', name: 'High Metal Helm α', slots: [1,1,0], skills: [['Stun Resistance',3],['Partbreaker',1]] },
          { slot: 'Chest', name: 'High Metal Mail α', slots: [1,1,0], skills: [['Iron Skin',3],['Partbreaker',1]] },
          { slot: 'Arms', name: 'High Metal Braces α', slots: [1,1,0], skills: [['Blast Resistance',3],['Partbreaker',1]] },
          { slot: 'Waist', name: 'High Metal Coil α', slots: [1,1,0], skills: [['Bombardier',3],['Aquatic/Oilsilt Mobility',2]] },
          { slot: 'Legs', name: 'High Metal Greaves α', slots: [1,1,0], skills: [['Flinch Free',3],['Bleeding Resistance',3]] }
        ]
      }
    }
  },
  {
    id: 'hope', set: 'Hope', element: 'Fire', tag: 'α', rarity: 5, verified: false,
    blurb: 'Hope — Divine Blessing 3, Stun Resistance 3, Poison Resistance 1. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: null,
        pieces: [
          { slot: 'Head', name: 'Hope Mask α', slots: [1,0,0], skills: [['Divine Blessing',2]] },
          { slot: 'Chest', name: 'Hope Mail α', slots: [2,1,0], skills: [['Poison Resistance',1]] },
          { slot: 'Arms', name: 'Hope Vambraces α', slots: [2,1,0], skills: [['Sleep Resistance',1]] },
          { slot: 'Waist', name: 'Hope Coil α', slots: [1,0,0], skills: [['Divine Blessing',1],['Stun Resistance',1]] },
          { slot: 'Legs', name: 'Hope Greaves α', slots: [1,0,0], skills: [['Stun Resistance',2]] }
        ]
      }
    }
  },
  {
    id: 'ingot', set: 'Ingot', element: 'Thunder', tag: 'α', rarity: 6, verified: false,
    blurb: 'Ingot — Resentment 5, Divine Blessing 3, Windproof 2. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: null,
        pieces: [
          { slot: 'Head', name: 'Ingot Helm α', slots: [1,1,0], skills: [['Divine Blessing',2],['Resentment',1]] },
          { slot: 'Chest', name: 'Ingot Mail α', slots: [2,1,0], skills: [['Windproof',1],['Resentment',1]] },
          { slot: 'Arms', name: 'Ingot Vambraces α', slots: [1,1,0], skills: [['Stun Resistance',2],['Resentment',1]] },
          { slot: 'Waist', name: 'Ingot Coil α', slots: [3,2,1], skills: [['Divine Blessing',1],['Resentment',1]] },
          { slot: 'Legs', name: 'Ingot Greaves α', slots: [1,1,0], skills: [['Windproof',1],['Resentment',1]] }
        ]
      }
    }
  },
  {
    id: 'king-beetle', set: 'King Beetle', element: 'Thunder', tag: 'α', rarity: 5, verified: false,
    blurb: 'King Beetle — Imparted Wisdom 5, Heroics 5, Foray 3. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Imparted Wisdom', tiers: [['Forager\'s Luck', 3]] },
        pieces: [
          { slot: 'Head', name: 'King Beetle Vertex α', slots: [1,1,0], skills: [['Heroics',1],['Foray',1],['Sleep Resistance',1]] },
          { slot: 'Chest', name: 'King Beetle Thorax α', slots: [1,1,0], skills: [['Heroics',1],['Foray',1],['Paralysis Resistance',1]] },
          { slot: 'Arms', name: 'King Beetle Brachia α', slots: [1,1,0], skills: [['Heroics',1],['Foray',1],['Poison Resistance',1]] },
          { slot: 'Waist', name: 'King Beetle Elytra α', slots: [1,1,0], skills: [['Heroics',1],['Flayer',1],['Paralysis Resistance',1]] },
          { slot: 'Legs', name: 'King Beetle Crura α', slots: [1,1,0], skills: [['Heroics',1],['Flayer',1],['Poison Resistance',1]] }
        ]
      }
    }
  },
  {
    id: 'kranodath', set: 'Kranodath', element: 'Fire', tag: 'α / β', rarity: 6, verified: false,
    blurb: 'Kranodath — partial set (1-piece). Flinch Free 2, Scaling Prowess 1, Partbreaker 1. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Scaling Prowess', tiers: [['Master Mounter', 3]] },
        pieces: [
          { slot: 'Chest', name: 'Kranodath Mail α', slots: [0,0,0], skills: [['Flinch Free',2],['Partbreaker',1]] }
        ]
      },
      'β': {
        group: { name: 'Scale Layering', tiers: [['Adrenaline', 3]] },
        pieces: [
          { slot: 'Chest', name: 'Kranodath Mail β', slots: [1,1,0], skills: [['Flinch Free',2]] }
        ]
      }
    }
  },
  {
    id: 'kunafa', set: 'Kunafa', element: 'Thunder', tag: 'α', rarity: 5, verified: false,
    blurb: 'Kunafa — partial set (4-piece). Imparted Wisdom 4, Wide-Range 4, Palico Rally 4. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Imparted Wisdom', tiers: [['Forager\'s Luck', 3]] },
        pieces: [
          { slot: 'Head', name: 'Kunafa Headgear α', slots: [1,1,0], skills: [['Wide-Range',2],['Palico Rally',1]] },
          { slot: 'Chest', name: 'Kunafa Cloak α', slots: [1,1,0], skills: [['Free Meal',2],['Palico Rally',1]] },
          { slot: 'Waist', name: 'Kunafa Sash α', slots: [1,1,0], skills: [['Speed Eating',2],['Palico Rally',1]] },
          { slot: 'Legs', name: 'Kunafa Chaps α', slots: [1,1,0], skills: [['Wide-Range',2],['Palico Rally',1]] }
        ]
      }
    }
  },
  {
    id: 'leather', set: 'Leather', element: 'Fire', tag: 'α', rarity: 5, verified: false,
    blurb: 'Leather — Botanist 4, Hunger Resistance 3, Item Prolonger 2. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: null,
        pieces: [
          { slot: 'Head', name: 'Leather Headgear α', slots: [1,0,0], skills: [['Botanist',2]] },
          { slot: 'Chest', name: 'Leather Mail α', slots: [1,0,0], skills: [['Botanist',1],['Item Prolonger',1]] },
          { slot: 'Arms', name: 'Leather Gloves α', slots: [1,0,0], skills: [['Botanist',1],['Hunger Resistance',1]] },
          { slot: 'Waist', name: 'Leather Belt α', slots: [2,1,0], skills: [['Hunger Resistance',1]] },
          { slot: 'Legs', name: 'Leather Pants α', slots: [1,0,0], skills: [['Hunger Resistance',1],['Item Prolonger',1]] }
        ]
      }
    }
  },
  {
    id: 'melahoa', set: 'Melahoa', element: 'Thunder', tag: 'α', rarity: 6, verified: false,
    blurb: 'Melahoa — Imparted Wisdom 5, Survival Expert 3, Tool Specialist 3. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Imparted Wisdom', tiers: [['Forager\'s Luck', 3]] },
        pieces: [
          { slot: 'Head', name: 'Melahoa Hat α', slots: [1,1,0], skills: [['Survival Expert',3],['Poison Resistance',2]] },
          { slot: 'Chest', name: 'Melahoa Jacket α', slots: [1,1,0], skills: [['Tool Specialist',3]] },
          { slot: 'Arms', name: 'Melahoa Branch α', slots: [1,1,0], skills: [['Recovery Speed',3],['Paralysis Resistance',2]] },
          { slot: 'Waist', name: 'Melahoa Folia α', slots: [1,1,0], skills: [['Recovery Up',3],['Bleeding Resistance',2]] },
          { slot: 'Legs', name: 'Melahoa Roots α', slots: [1,1,0], skills: [['Mushroomancer',3]] }
        ]
      }
    }
  },
  {
    id: 'mimiphyta', set: 'Mimiphyta', element: 'Water', tag: 'α', rarity: 6, verified: false,
    blurb: 'Mimiphyta — partial set (1-piece). Fortifying Pelt 1, Entomologist 1, Ambush 1. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Fortifying Pelt', tiers: [['Fortify', 3]] },
        pieces: [
          { slot: 'Head', name: 'Mimiphyta α', slots: [1,0,0], skills: [['Entomologist',1],['Ambush',1]] }
        ]
      }
    }
  },
  {
    id: 'piragill', set: 'Piragill', element: 'Water', tag: 'α / β', rarity: 5, verified: false,
    blurb: 'Piragill — partial set (1-piece). Water Resistance 2, Flexible Leathercraft 1, Aquatic/Oilsilt Mobility 1. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Flexible Leathercraft', tiers: [['Hunter Gatherer', 3]] },
        pieces: [
          { slot: 'Legs', name: 'Piragill Greaves α', slots: [0,0,0], skills: [['Aquatic/Oilsilt Mobility',1],['Water Resistance',2]] }
        ]
      },
      'β': {
        group: { name: 'Buttery Leathercraft', tiers: [['Affinity Sliding', 3]] },
        pieces: [
          { slot: 'Legs', name: 'Piragill Greaves β', slots: [1,1,0], skills: [['Aquatic/Oilsilt Mobility',1]] }
        ]
      }
    }
  },
  {
    id: 'sild', set: 'Sild', element: 'Dragon', tag: 'α', rarity: 6, verified: false,
    blurb: 'Sild — partial set (2-piece). Wide-Range 4, Botanist 3, Imparted Wisdom 2. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Imparted Wisdom', tiers: [['Forager\'s Luck', 3]] },
        pieces: [
          { slot: 'Head', name: 'Sild Hood α', slots: [3,2,1], skills: [['Botanist',3]] },
          { slot: 'Chest', name: 'Sild Coat α', slots: [1,1,0], skills: [['Wide-Range',4]] }
        ]
      }
    }
  },
  {
    id: 'suja', set: 'Suja', element: 'Ice', tag: 'α', rarity: 7, verified: false,
    blurb: 'Suja — partial set (1-piece). Divine Blessing 3, Imparted Wisdom 1. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Imparted Wisdom', tiers: [['Forager\'s Luck', 3]] },
        pieces: [
          { slot: 'Waist', name: 'Suja Sash α', slots: [3,2,1], skills: [['Divine Blessing',3]] }
        ]
      }
    }
  },
  {
    id: 'talioth', set: 'Talioth', element: 'Fire', tag: 'α / β', rarity: 6, verified: false,
    blurb: 'Talioth — partial set (1-piece). Flexible Leathercraft 1, Leap of Faith 1, Burst 1. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Flexible Leathercraft', tiers: [['Hunter Gatherer', 3]] },
        pieces: [
          { slot: 'Arms', name: 'Talioth Vambraces α', slots: [0,0,0], skills: [['Leap of Faith',1],['Burst',1]] }
        ]
      },
      'β': {
        group: { name: 'Buttery Leathercraft', tiers: [['Affinity Sliding', 3]] },
        pieces: [
          { slot: 'Arms', name: 'Talioth Vambraces β', slots: [2,1,1], skills: [['Leap of Faith',1]] }
        ]
      }
    }
  },
  {
    id: 'vespoid', set: 'Vespoid', element: 'Dragon', tag: 'α / β', rarity: 5, verified: false,
    blurb: 'Vespoid — Neopteron Alert 5, Survival Expert 3, Paralysis Resistance 3. Slots & skills verified from game data; element/rarity approximate.',
    bonus: null,
    variants: {
      'α': {
        group: { name: 'Neopteron Alert', tiers: [['Honey Hunter', 3]] },
        pieces: [
          { slot: 'Head', name: 'Vespoid Helm α', slots: [0,0,0], skills: [['Survival Expert',1],['Ambush',1]] },
          { slot: 'Chest', name: 'Vespoid Mail α', slots: [1,0,0], skills: [['Survival Expert',1],['Evade Window',1]] },
          { slot: 'Arms', name: 'Vespoid Vambraces α', slots: [0,0,0], skills: [['Paralysis Resistance',1],['Ambush',1]] },
          { slot: 'Waist', name: 'Vespoid Coil α', slots: [1,0,0], skills: [['Paralysis Resistance',1],['Evade Window',1]] },
          { slot: 'Legs', name: 'Vespoid Greaves α', slots: [2,1,0], skills: [['Survival Expert',1],['Paralysis Resistance',1]] }
        ]
      },
      'β': {
        group: { name: 'Neopteron Camouflage', tiers: [['Fleetfoot', 3]] },
        pieces: [
          { slot: 'Head', name: 'Vespoid Helm β', slots: [1,1,0], skills: [['Survival Expert',1]] },
          { slot: 'Chest', name: 'Vespoid Mail β', slots: [3,2,1], skills: [['Survival Expert',1]] },
          { slot: 'Arms', name: 'Vespoid Vambraces β', slots: [1,1,0], skills: [['Paralysis Resistance',1]] },
          { slot: 'Waist', name: 'Vespoid Coil β', slots: [3,2,1], skills: [['Paralysis Resistance',1]] },
          { slot: 'Legs', name: 'Vespoid Greaves β', slots: [2,1,1], skills: [['Survival Expert',1]] }
        ]
      }
    }
  }
];

var SLOT_GLYPH = { 0: '—', 1: '①', 2: '②', 3: '③' };
var SLOT_NUM = { 0: '', 1: '1', 2: '2', 3: '3' };

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
// ── Verified against Game8 MH Wilds skill list (Ver 1.04x):
//    adds every decoration skill that was missing a cap, and corrects
//    several existing caps (elemental attacks are 3 not 5, Guard 3, etc).
Object.assign(SKILL_MAX, {
  // weapon skills
  'Airborne': 1, 'Artillery': 3, 'Ballistics': 3, 'Bludgeoner': 3, 'Charge Master': 3,
  'Charge Up': 1, 'Critical Element': 3, 'Critical Status': 3, 'Focus': 3, 'Handicraft': 5,
  'Horn Maestro': 2, 'Load Shells': 2, "Mind's Eye": 3, 'Normal Shots': 1, 'Opening Shot': 3,
  'Piercing Shots': 1, 'Poison Duration Up': 1, 'Power Prolonger': 3, 'Protective Polish': 3,
  'Punishing Draw': 3, 'Rapid Fire Up': 1, 'Rapid Morph': 3, 'Razor Sharp': 3, 'Slugger': 3,
  'Special Ammo Boost': 2, 'Speed Sharpening': 2, 'Spread/Power Shots': 1, 'Stamina Thief': 3,
  'Tetrad Shot': 3, 'Partbreaker': 3, 'Heroics': 5, 'Foray': 5,
  'Blast Functionality': 1, 'Exhaust Functionality': 1, 'Para Functionality': 1,
  'Poison Functionality': 1, 'Sleep Functionality': 1,
  // armor skills
  'Adaptability': 2, 'Ambush': 3, 'Bind Resistance': 3, 'Blast Resistance': 3,
  'Bleeding Resistance': 3, 'Blindsider': 1, 'Bombardier': 3, 'Botanist': 4, 'Cliffhanger': 1,
  'Defense Boost': 5, 'Dragon Resistance': 3, 'Entomologist': 1, 'Fire Resistance': 3,
  'Free Meal': 3, 'Geologist': 3, 'Hunger Resistance': 3, 'Ice Resistance': 3, 'Intimidator': 3,
  'Iron Skin': 3, 'Item Prolonger': 3, 'Jump Master': 1, 'Leap of Faith': 1, 'Mushroomancer': 3,
  'Outdoorsman': 1, 'Paralysis Resistance': 3, 'Poison Resistance': 3, 'Self-Improvement': 1,
  'Shock Absorber': 1, 'Sleep Resistance': 3, 'Stench Resistance': 2, 'Survival Expert': 3,
  'Thunder Resistance': 3, 'Water Resistance': 3, 'Wide-Range': 5, 'Windproof': 3,
  // corrections to previously-wrong caps
  'Fire Attack': 3, 'Water Attack': 3, 'Thunder Attack': 3, 'Ice Attack': 3, 'Dragon Attack': 3,
  'Guard': 3, 'Guard Up': 3, 'Earplugs': 3, 'Divine Blessing': 3, 'Peak Performance': 5,
  'Tool Specialist': 5, "Master's Touch": 1, 'Aquatic/Oilsilt Mobility': 2
});
SKILL_MAX['Master\u2019s Touch'] = 1;
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
function armorBonusTiers(name) {
  for (var i = 0; i < ARMOR_SETS.length; i++) {
    var b = ARMOR_SETS[i].bonus;
    if (b && b.name === name && b.tiers) return b.tiers;
  }
  // Set bonuses whose source set isn't in this guide (e.g. Zoh Shia)
  var fallback = { 'Zoh Shia\'s Pulse': [['Super Recovery I', 2], ['Super Recovery II', 4]] };
  return fallback[name] || [[name + ' I', 2], [name + ' II', 4]];
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

/* ── Weapon rolled Set Bonus + Group skill (MH Wilds artian/weapon rolls).
   A weapon can roll ONE set-bonus skill and ONE group skill — each counts as
   +1 piece toward that bonus/group's tier thresholds, like an extra armor piece. ── */
var _SETBONUS_LIST = null, _GROUP_LIST = null;
function armorAllSetBonuses() {
  if (!_SETBONUS_LIST) {
    var seen = {}, list = [];
    ARMOR_SETS.forEach(function (s) {
      if (s.bonus && s.bonus.name && !seen[s.bonus.name]) { seen[s.bonus.name] = 1; list.push(s.bonus.name); }
      var vs = s.variants || {};
      Object.keys(vs).forEach(function (k) {
        (vs[k].pieces || []).forEach(function (p) {
          if (p.setBonus && p.setBonus.name && !seen[p.setBonus.name]) { seen[p.setBonus.name] = 1; list.push(p.setBonus.name); }
        });
      });
    });
    list.sort();
    _SETBONUS_LIST = list.map(function (n) { return { name: n, tiers: armorBonusTiers(n) }; });
  }
  return _SETBONUS_LIST;
}
function armorAllGroups() {
  if (!_GROUP_LIST) {
    var seen = {}, list = [];
    ARMOR_SETS.forEach(function (s) {
      var vs = s.variants || {};
      Object.keys(vs).forEach(function (k) {
        if (vs[k].group && vs[k].group.name && !seen[vs[k].group.name]) { seen[vs[k].group.name] = 1; list.push(vs[k].group.name); }
        (vs[k].pieces || []).forEach(function (p) {
          if (p.group && p.group.name && !seen[p.group.name]) { seen[p.group.name] = 1; list.push(p.group.name); }
        });
      });
    });
    list.sort();
    _GROUP_LIST = list.map(function (n) { return { name: n, tiers: armorGroupTiers(n) }; });
  }
  return _GROUP_LIST;
}
function armorEsc(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
function armorWeapon() { return (typeof armorBuild !== 'undefined' && armorBuild.weapon) || null; }
function armorSetWeaponRoll(key, name) {
  var w = armorBuild.weapon || {};
  if (name) w[key] = name; else delete w[key];
  if (w.bonus || w.group) armorBuild.weapon = w; else delete armorBuild.weapon;
  armorSaveBuild();
  if (typeof armorRenderBuild === 'function') armorRenderBuild();
  if (typeof armorRender === 'function') armorRender();
}
function armorSetWeaponBonus(name) { armorSetWeaponRoll('bonus', name); }
function armorSetWeaponGroup(name) { armorSetWeaponRoll('group', name); }

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

/* ════ Compact build code v1 — bit-packed + base64url, prefixed with '~'.
   Far shorter than the legacy base36 segments. Legacy codes (no '~') still
   decode via the old path for safety. Bit widths sized to the data with a
   little headroom: piece 9b, setbonus 6b, group 4b, skill 8b, deco-id 9b. ── */
function armorB64urlEnc(bytes) {
  var s = '';
  for (var i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function armorB64urlDec(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  var s = atob(str), out = new Uint8Array(s.length);
  for (var i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}
function ArmorBitW() { this.bits = []; }
ArmorBitW.prototype.w = function (val, n) { for (var i = n - 1; i >= 0; i--) this.bits.push((val >> i) & 1); return this; };
ArmorBitW.prototype.bytes = function () {
  while (this.bits.length % 8) this.bits.push(0);
  var out = new Uint8Array(this.bits.length / 8);
  for (var i = 0; i < out.length; i++) { var b = 0; for (var j = 0; j < 8; j++) b = (b << 1) | this.bits[i * 8 + j]; out[i] = b; }
  return out;
};
function ArmorBitR(bytes) { this.bits = []; for (var i = 0; i < bytes.length; i++) for (var j = 7; j >= 0; j--) this.bits.push((bytes[i] >> j) & 1); this.p = 0; }
ArmorBitR.prototype.r = function (n) { var v = 0; for (var i = 0; i < n; i++) v = (v << 1) | (this.bits[this.p++] || 0); return v; };

function armorBuildCodeBin() {
  var w = new ArmorBitW();
  w.w(1, 4); // version
  // pieces (5) — value = setIdx*3 + variantOrd + 1, 0 = empty
  SLOT_ORDER.forEach(function (k) {
    var b = armorBuild[k], val = 0;
    if (b) {
      var idx = -1;
      for (var i = 0; i < ARMOR_SETS.length; i++) if (ARMOR_SETS[i].id === b.setId) { idx = i; break; }
      if (idx >= 0) val = idx * 3 + (VAR_ORD[b.variant] || 0) + 1;
    }
    w.w(val, 9);
  });
  // weapon rolled bonus/group (idx+1, 0 = none)
  var wp = armorBuild.weapon || {};
  var bi = wp.bonus ? armorAllSetBonuses().map(function (x) { return x.name; }).indexOf(wp.bonus) : -1;
  var gi = wp.group ? armorAllGroups().map(function (x) { return x.name; }).indexOf(wp.group) : -1;
  w.w(bi >= 0 ? bi + 1 : 0, 6);
  w.w(gi >= 0 ? gi + 1 : 0, 4);
  // charm: 0 none / 1 craftable / 2 custom
  if (armorCharmMode() === 'custom') {
    var c = armorCustomCharm();
    if (!c || !c.rarity) { w.w(0, 2); }
    else {
      w.w(2, 2);
      w.w((c.rarity - 5) & 3, 2);
      var slotIdx = (AMULET_SLOTS[c.rarity] || []).indexOf(c.slots);
      w.w(slotIdx >= 0 ? slotIdx : 7, 3);
      var sk = armorCustomSkills().filter(function (s) { return s[0]; }).slice(0, 3);
      w.w(sk.length, 2);
      sk.forEach(function (s) {
        var si = armorAllSkills().indexOf(s[0]);
        w.w(si >= 0 ? si : 0, 8);
        w.w((s[1] || 1) & 7, 3);
      });
    }
  } else {
    var name = armorGetCharm(), ci = -1;
    if (name && typeof CHARMS !== 'undefined') for (var ii = 0; ii < CHARMS.length; ii++) if (CHARMS[ii].name === name) { ci = ii; break; }
    if (ci >= 0) { w.w(1, 2); w.w(ci, 7); } else { w.w(0, 2); }
  }
  // decos — count, then (slotPos 5b, decoIdx 9b) each
  var map = armorDecoSlotMap(), filled = [];
  for (var p = 0; p < map.length; p++) {
    var id = armorDecoFor(map[p][0], map[p][1]);
    if (!id) continue;
    var di = -1;
    for (var d = 0; d < DECORATIONS.length; d++) if (DECORATIONS[d].id === id) { di = d; break; }
    if (di < 0) continue;
    filled.push([p, di]);
  }
  w.w(filled.length, 5);
  filled.forEach(function (f) { w.w(f[0], 5); w.w(f[1], 9); });
  // per-piece transcend flags (one bit each, in SLOT_ORDER). Old codes lack them → read as 0.
  SLOT_ORDER.forEach(function (k) { w.w(armorBuild[k] && armorBuild[k].transcend ? 1 : 0, 1); });
  return armorB64urlEnc(w.bytes());
}
function armorApplyCodeBin(code) {
  var r;
  try { r = new ArmorBitR(armorB64urlDec(code)); } catch (e) { armorCodeMsg('Invalid code', true); return true; }
  if (r.r(4) !== 1) { armorCodeMsg('Unsupported code version', true); return true; }
  var next = {}, count = 0;
  for (var i = 0; i < SLOT_ORDER.length; i++) {
    var val = r.r(9);
    if (!val) continue;
    val -= 1;
    var set = ARMOR_SETS[Math.floor(val / 3)], variant = ORD_VAR[val % 3];
    if (set && armorPieceFor(set.id, variant, SLOT_ORDER[i])) { next[SLOT_ORDER[i]] = { setId: set.id, variant: variant }; count++; }
  }
  armorBuild = next;
  var bi = r.r(6), gi = r.r(4), wp = {};
  if (bi) { var b = armorAllSetBonuses()[bi - 1]; if (b) wp.bonus = b.name; }
  if (gi) { var g = armorAllGroups()[gi - 1]; if (g) wp.group = g.name; }
  if (wp.bonus || wp.group) armorBuild.weapon = wp; else delete armorBuild.weapon;
  var mode = r.r(2);
  if (mode === 2) {
    var rarity = 5 + r.r(2), slotIdx = r.r(3);
    var slots = (slotIdx !== 7 && AMULET_SLOTS[rarity]) ? (AMULET_SLOTS[rarity][slotIdx] || '') : '';
    var n = r.r(2), skills = [];
    for (var s = 0; s < n; s++) { var si = r.r(8), lv = r.r(3), nm = armorAllSkills()[si]; if (nm) skills.push([nm, lv || 1]); }
    armorBuild.charm = { type: 'custom', rarity: rarity, slots: slots, skills: skills };
  } else if (mode === 1) {
    var ci = r.r(7);
    if (typeof CHARMS !== 'undefined' && CHARMS[ci]) armorBuild.charm = CHARMS[ci].name; else delete armorBuild.charm;
  } else { delete armorBuild.charm; }
  var map = armorDecoSlotMap();
  map.forEach(function (m) { armorSetDecoFor(m[0], m[1], ''); });
  var dc = r.r(5);
  for (var dd = 0; dd < dc; dd++) {
    var pos = r.r(5), did = r.r(9), slot = map[pos], deco = DECORATIONS[did];
    if (slot && deco) armorSetDecoFor(slot[0], slot[1], deco.id);
  }
  // per-piece transcend flags (SLOT_ORDER order). Absent in older codes → read 0/false.
  SLOT_ORDER.forEach(function (k) { var t = !!r.r(1); if (armorBuild[k]) armorBuild[k].transcend = t; });
  armorSaveBuild(); armorRenderBuild(); armorRender();
  armorCodeMsg('Loaded ' + count + ' piece' + (count === 1 ? '' : 's'), false);
  return true;
}

function armorBuildCode() {
  return armorBuildCodeBin();
}
// Legacy base36 builder kept for reference / migrating old codes.
function armorBuildCodeLegacy() {
  var pieceCode = SLOT_ORDER.map(function (k) {
    var b = armorBuild[k];
    return b ? armorPieceToken(b.setId, b.variant) : '00';
  }).join('');
  return pieceCode +
    (typeof armorWeaponCodeSegment === 'function' ? armorWeaponCodeSegment() : '') +
    (typeof armorCharmCodeSegment === 'function' ? armorCharmCodeSegment() : '') +
    (typeof armorDecoCodeSegment === 'function' ? armorDecoCodeSegment() : '');
}

/* ── weapon rolled bonus/group <-> build-code (fixed 5-char segment 'W'+bb+gg).
   bb/gg = base36 (index+1) into armorAllSetBonuses()/armorAllGroups(); 00 = none. ── */
function armorWeaponCodeSegment() {
  var w = armorBuild.weapon;
  if (!w || (!w.bonus && !w.group)) return '';
  function idxTok(list, name) {
    var i = name ? list.map(function (x) { return x.name; }).indexOf(name) : -1;
    var n = i >= 0 ? i + 1 : 0;
    var c = n.toString(36).toUpperCase();
    return c.length < 2 ? '0' + c : c;
  }
  return 'W' + idxTok(armorAllSetBonuses(), w.bonus) + idxTok(armorAllGroups(), w.group);
}
function armorWeaponApplySegment(seg) {
  if (!seg) { delete armorBuild.weapon; return; }
  var bIdx = parseInt(seg.substr(1, 2), 36) || 0;
  var gIdx = parseInt(seg.substr(3, 2), 36) || 0;
  var w = {};
  if (bIdx) { var b = armorAllSetBonuses()[bIdx - 1]; if (b) w.bonus = b.name; }
  if (gIdx) { var g = armorAllGroups()[gIdx - 1]; if (g) w.group = g.name; }
  if (w.bonus || w.group) armorBuild.weapon = w; else delete armorBuild.weapon;
}

/* ── charm <-> build-code (segment starts with 'C') ── */
function armorSkillToken(name) {
  var idx = armorAllSkills().indexOf(name);
  if (idx < 0) return '00';
  var c = (idx + 1).toString(36).toUpperCase();
  return c.length < 2 ? '0' + c : c;
}
function armorTokenSkill(tok) {
  var n = parseInt(tok, 36);
  return (!n || isNaN(n)) ? null : (armorAllSkills()[n - 1] || null);
}
function armorCharmCodeSegment() {
  if (armorCharmMode() === 'custom') {
    var c = armorCustomCharm();
    if (!c || !c.rarity) return '';
    var rarCh = c.rarity.toString(36).toUpperCase();
    var slotIdx = (AMULET_SLOTS[c.rarity] || []).indexOf(c.slots);
    var slotCh = slotIdx >= 0 ? slotIdx.toString(36).toUpperCase() : 'Z';
    var sk = armorCustomSkills().filter(function (s) { return s[0]; }).slice(0, 3);
    var out = 'CU' + rarCh + slotCh + sk.length.toString(36).toUpperCase();
    sk.forEach(function (s) { out += armorSkillToken(s[0]) + ((s[1] || 1).toString(36).toUpperCase()); });
    return out;
  }
  var name = armorGetCharm();
  if (!name || typeof CHARMS === 'undefined') return '';
  var idx = -1;
  for (var i = 0; i < CHARMS.length; i++) if (CHARMS[i].name === name) { idx = i; break; }
  if (idx < 0) return '';
  var t = (idx + 1).toString(36).toUpperCase();
  if (t.length < 2) t = '0' + t;
  return 'CC' + t;
}
function armorCharmApplySegment(seg) {
  if (!seg) { delete armorBuild.charm; return; }
  var marker = seg.charAt(1);
  if (marker === 'U') {
    var rarity = parseInt(seg.charAt(2), 36) || 0;
    var slotCh = seg.charAt(3);
    var slotIdx = (slotCh === 'Z') ? -1 : parseInt(slotCh, 36);
    var slots = (slotIdx >= 0 && AMULET_SLOTS[rarity]) ? (AMULET_SLOTS[rarity][slotIdx] || '') : '';
    var n = parseInt(seg.charAt(4), 36) || 0;
    var skills = [];
    for (var i = 0; i < n; i++) {
      var base = 5 + i * 3;
      var nm = armorTokenSkill(seg.substr(base, 2));
      var lv = parseInt(seg.charAt(base + 2), 36) || 1;
      if (nm) skills.push([nm, lv]);
    }
    armorBuild.charm = { type: 'custom', rarity: rarity, slots: slots, skills: skills };
  } else { // craftable
    var idx = parseInt(seg.substr(2, 2), 36) - 1;
    if (typeof CHARMS !== 'undefined' && CHARMS[idx]) armorBuild.charm = CHARMS[idx].name;
    else delete armorBuild.charm;
  }
}
function armorCharmSegLen(rest) {
  if (rest.charAt(0) !== 'C') return 0;
  if (rest.charAt(1) === 'U') {
    var n = parseInt(rest.charAt(4), 36) || 0;
    return 5 + n * 3;
  }
  return 4; // craftable: CC + 2
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
  var code = raw.trim().replace(/^MHW-/i, '').replace(/\s+/g, '');
  armorApplyCodeBin(code);
}

function armorCopyCode() {
  var code = armorBuildCode();
  // Async Clipboard API first (secure contexts); fall back to execCommand on reject.
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(function () {
        armorCodeMsg('Copied!', false);
      }).catch(function () { armorFallbackCopy(code); });
      return;
    }
  } catch (e) { /* fall through */ }
  armorFallbackCopy(code);
}
function armorFallbackCopy(text) {
  try {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.left = '0';
    ta.style.width = '1px';
    ta.style.height = '1px';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, text.length);
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    armorCodeMsg(ok ? 'Copied!' : 'Press Ctrl+C to copy', !ok);
  } catch (e) {
    armorCodeMsg('Select the code & press Ctrl+C', true);
  }
}

/* Curated preset builds — pick from a dropdown to load instantly. */
var ARMOR_PRESETS = [
  {
    name: "Ch1CHi's Charge Blade — General Elemental",
    code: 'EEC4lggAjhLkdDJeCiBhgoqMgEEhhucQpG7Bu0QuELyBAYSGEwmg',
    credit: 'Ch1CHi',
    url: 'https://www.youtube.com/@Ch1CHi_MH'
  }
];
/* If the current build matches a preset's code exactly, return that preset. */
function armorActivePreset() {
  var code = armorBuildCode();
  for (var i = 0; i < ARMOR_PRESETS.length; i++) if (ARMOR_PRESETS[i].code === code) return ARMOR_PRESETS[i];
  return null;
}
/* Credit line shown under the build header when a credited preset is loaded. */
function armorCreditHtml() {
  var p = armorActivePreset();
  if (!p || !p.credit) return '';
  if (p.url) {
    return '<a class="armorb-credit" href="' + armorEsc(p.url) + '" target="_blank" rel="noopener">' +
      '<span class="armorb-credit-txt">Preset build by <b>' + armorEsc(p.credit) + '</b></span>' +
      '<span class="armorb-credit-yt"><svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg> YouTube</span>' +
    '</a>';
  }
  return '<div class="armorb-credit"><span class="armorb-credit-txt">Preset build by <b>' + armorEsc(p.credit) + '</b></span></div>';
}
function armorLoadPreset(idx) {
  var p = ARMOR_PRESETS[parseInt(idx, 10)];
  if (!p) return;
  armorApplyCode(p.code);
  armorCodeMsg('Loaded "' + p.name + '"', false);
}

/* ════ User-saved builds — stored in localStorage on THIS browser only.
   Each entry: { name, code, ts }. No cap; newest first. ════ */
var ARMOR_SAVED_KEY = 'armor_saved_builds';
function armorSavedBuilds() {
  try { var v = JSON.parse(localStorage.getItem(ARMOR_SAVED_KEY) || '[]'); return Array.isArray(v) ? v : []; }
  catch (e) { return []; }
}
function armorWriteSaved(list) {
  try { localStorage.setItem(ARMOR_SAVED_KEY, JSON.stringify(list)); } catch (e) {}
}
/* Save current build under `name`. Overwrites a same-name entry (case-insensitive). */
function armorSaveCurrentBuild(name) {
  name = (name || '').trim();
  if (!name) { armorCodeMsg('Enter a name first', true); return false; }
  var code = armorBuildCode();
  var list = armorSavedBuilds();
  var lower = name.toLowerCase();
  var existing = -1;
  for (var i = 0; i < list.length; i++) if ((list[i].name || '').toLowerCase() === lower) { existing = i; break; }
  if (existing >= 0) {
    if (!window.confirm('A build named "' + list[existing].name + '" already exists. Overwrite it?')) return false;
    list.splice(existing, 1);
  }
  list.unshift({ name: name, code: code, ts: Date.now() });
  armorWriteSaved(list);
  armorCodeMsg('Saved "' + name + '"', false);
  armorRenderBuild();
  return true;
}
function armorLoadSaved(idx) {
  var list = armorSavedBuilds();
  var b = list[parseInt(idx, 10)];
  if (!b) return;
  armorApplyCode(b.code);
  armorCodeMsg('Loaded "' + b.name + '"', false);
}
/* index of the saved build whose code matches the current build, or -1. */
function armorActiveSavedIdx() {
  var code = armorBuildCode(), list = armorSavedBuilds();
  for (var i = 0; i < list.length; i++) if (list[i].code === code) return i;
  return -1;
}
function armorDeleteSaved(idx) {
  var list = armorSavedBuilds();
  var b = list[parseInt(idx, 10)];
  if (!b) return;
  if (!window.confirm('Delete saved build "' + b.name + '"?')) return;
  list.splice(parseInt(idx, 10), 1);
  armorWriteSaved(list);
  armorCodeMsg('Deleted "' + b.name + '"', false);
  armorRenderBuild();
}
/* Show/cancel the inline "name this build" input. */
function armorToggleSaveInput(show) {
  var row = document.getElementById('armor-save-row');
  if (!row) return;
  row.style.display = show ? 'flex' : 'none';
  if (show) { var inp = document.getElementById('armor-save-name'); if (inp) { inp.value = ''; inp.focus(); } }
}
function armorConfirmSave() {
  var inp = document.getElementById('armor-save-name');
  if (inp && armorSaveCurrentBuild(inp.value)) armorToggleSaveInput(false);
}
/* Export all saved builds as a JSON string (for backup / sharing the whole set). */
function armorExportSaved() {
  var list = armorSavedBuilds();
  if (!list.length) { armorCodeMsg('No saved builds to export', true); return; }
  var json = JSON.stringify({ mhwilds_builds: list }, null, 0);
  var inp = document.getElementById('armor-code-input');
  if (inp) { inp.value = json; inp.focus(); inp.select(); }
  armorFallbackCopy(json);
  armorCodeMsg(list.length + ' builds copied — paste somewhere safe', false);
}
/* Import builds from a pasted JSON export (merges, newest first, de-dupes by name). */
function armorImportSaved(raw) {
  var data;
  try { data = JSON.parse(raw); } catch (e) { armorCodeMsg('That is not a valid builds export', true); return; }
  var incoming = data && data.mhwilds_builds;
  if (!Array.isArray(incoming) || !incoming.length) { armorCodeMsg('No builds found in that text', true); return; }
  var list = armorSavedBuilds();
  var byName = {};
  list.forEach(function (b) { byName[(b.name || '').toLowerCase()] = true; });
  var added = 0;
  incoming.forEach(function (b) {
    if (!b || !b.name || !b.code) return;
    var key = b.name.toLowerCase();
    if (byName[key]) return; // keep existing on name clash
    list.unshift({ name: b.name, code: b.code, ts: b.ts || Date.now() });
    byName[key] = true; added++;
  });
  armorWriteSaved(list);
  armorCodeMsg('Imported ' + added + ' build' + (added === 1 ? '' : 's'), false);
  armorRenderBuild();
}
function armorCodeBar() {
  var code = armorBuildCode();
  var saved = armorSavedBuilds();
  // which option matches the current build (so the dropdown shows its name)
  var curCode = code;
  var activeVal = '';
  for (var si = 0; si < saved.length; si++) if (saved[si].code === curCode) { activeVal = 's' + si; break; }
  if (!activeVal) for (var pi = 0; pi < ARMOR_PRESETS.length; pi++) if (ARMOR_PRESETS[pi].code === curCode) { activeVal = 'p' + pi; break; }
  var selAttr = function (v) { return v === activeVal ? ' selected' : ''; };
  // merged dropdown: My Builds (saved) optgroup + Preset Builds optgroup.
  var savedOpts = saved.length
    ? '<optgroup label="My Builds">' + saved.map(function (b, i) { return '<option value="s' + i + '"' + selAttr('s' + i) + '>' + armorEsc(b.name) + '</option>'; }).join('') + '</optgroup>'
    : '';
  var presetOpts = '<optgroup label="Preset Builds">' +
    ARMOR_PRESETS.map(function (p, i) { return '<option value="p' + i + '"' + selAttr('p' + i) + '>' + armorEsc(p.name) + '</option>'; }).join('') + '</optgroup>';
  return '<div class="armorb-codebar">' +
    '<div class="armorb-preset-row">' +
      '<span class="armorb-code-label">Builds</span>' +
      '<select id="armor-preset-sel" class="armorb-preset-sel" onchange="armorPickBuild(this.value);">' +
        '<option value="">' + (curCode && !activeVal ? '— Custom build (unsaved) —' : '— Load a build —') + '</option>' + savedOpts + presetOpts +
      '</select>' +
      '<button class="armorb-code-btn save" title="Save current build" onclick="armorToggleSaveInput(true)">★ Save</button>' +
      (armorActiveSavedIdx() >= 0 ? '<button class="armorb-code-btn ghost" title="Delete this saved build" onclick="armorDeleteSaved(' + armorActiveSavedIdx() + ')">Delete</button>' : '') +
    '</div>' +
    '<div class="armorb-save-row" id="armor-save-row" style="display:none">' +
      '<input id="armor-save-name" class="armorb-code-input" placeholder="Name this build…" spellcheck="false" autocomplete="off" maxlength="48" onkeydown="if(event.key===\'Enter\'){armorConfirmSave();}else if(event.key===\'Escape\'){armorToggleSaveInput(false);}">' +
      '<button class="armorb-code-btn apply" onclick="armorConfirmSave()">Save</button>' +
      '<button class="armorb-code-btn ghost" onclick="armorToggleSaveInput(false)">Cancel</button>' +
    '</div>' +
    '<div class="armorb-code-row">' +
      '<span class="armorb-code-label">Build code</span>' +
      '<input id="armor-code-input" class="armorb-code-input" value="' + code + '" placeholder="Paste a build code or builds export…" spellcheck="false" autocomplete="off">' +
      '<button class="armorb-code-btn" onclick="armorCopyCode()">Copy</button>' +
      '<button class="armorb-code-btn apply" onclick="armorSmartLoad(document.getElementById(\'armor-code-input\').value)">Load</button>' +
      '<span class="armorb-code-msg" id="armor-code-msg"></span>' +
    '</div>' +
    '</div>';
}
/* compact list of saved builds with load + delete affordances. */
function armorSavedListHtml() {
  var saved = armorSavedBuilds();
  if (!saved.length) return '';
  return '<div class="armorb-saved-list">' + saved.map(function (b, i) {
    return '<div class="armorb-saved-item">' +
      '<button class="armorb-saved-load" title="Load this build" onclick="armorLoadSaved(' + i + ')"><span class="armorb-saved-star">★</span>' + armorEsc(b.name) + '</button>' +
      '<button class="armorb-saved-del" title="Delete" onclick="armorDeleteSaved(' + i + ')">\u2715</button>' +
    '</div>';
  }).join('') + '</div>';
}
/* dropdown picker: values prefixed s(aved) / p(reset). */
function armorPickBuild(v) {
  if (!v) return;
  if (v.charAt(0) === 's') armorLoadSaved(v.slice(1));
  else if (v.charAt(0) === 'p') armorLoadPreset(v.slice(1));
}
/* Load box accepts either a single build code or a full builds-export JSON. */
function armorSmartLoad(raw) {
  var t = (raw || '').trim();
  if (t.charAt(0) === '{' && t.indexOf('mhwilds_builds') >= 0) { armorImportSaved(t); return; }
  armorApplyCode(t);
}
function armorEquipFullSet(setId, variant) {
  SLOT_ORDER.forEach(function (k) { if (armorPieceFor(setId, variant, k)) armorBuild[k] = { setId: setId, variant: variant }; });
  armorSaveBuild(); armorRenderBuild(); armorRender();
}

/* Skill-summary order: maxed skills first (by max value desc, e.g. 5/5 → 4/4 →
   3/3), then non-maxed skills by current points desc. Ties broken by name. */
function armorMakeSkillCmp(totals) {
  return function (a, b) {
    var ma = armorSkillMax(a), mb = armorSkillMax(b);
    var ca = totals[a] || 0, cb = totals[b] || 0;
    var fa = (ma && ca >= ma) ? 1 : 0;
    var fb = (mb && cb >= mb) ? 1 : 0;
    if (fa !== fb) return fb - fa;          // full skills on top
    if (fa) {                                // both full → higher max first, then higher level
      if ((mb || 0) !== (ma || 0)) return (mb || 0) - (ma || 0);
      if (cb !== ca) return cb - ca;
      return a.localeCompare(b);
    }
    if (cb !== ca) return cb - ca;           // both not full → more points first
    return a.localeCompare(b);
  };
}
/* "count / next-unmet-threshold" for a set bonus or group skill, e.g. 1/2, 2/4, 4/4. */
function armorTierProg(tiers, cnt) {
  var sorted = tiers.slice().sort(function (a, b) { return a[1] - b[1]; });
  var denom = sorted[sorted.length - 1][1];
  for (var i = 0; i < sorted.length; i++) { if (cnt < sorted[i][1]) { denom = sorted[i][1]; break; } }
  return cnt + '/' + denom;
}
/* segmented level meter for a skill (max segments, cur filled). */
function armorSkillBar(cur, max) {
  if (!max) return '<span class="armorb-skbar nomax"></span>';
  var s = '';
  for (var i = 1; i <= max; i++) s += '<i class="armorb-skseg' + (i <= cur ? ' on' : '') + (cur > max ? ' over' : '') + '"></i>';
  return '<span class="armorb-skbar">' + s + '</span>';
}
/* one skill row: name · meter · cur/max */
function armorSkillRow(n, cur, max) {
  var over = max && cur > max, maxed = max && cur >= max;
  var cls = over ? ' over' : (maxed ? ' maxed' : '');
  return '<div class="armorb-skrow' + cls + '">' +
    '<span class="armorb-skname">' + armorEsc(n) + '</span>' +
    armorSkillBar(cur, max) +
    '<span class="armorb-skval">' + (max ? cur + '/' + max : '+' + cur) + '</span></div>';
}
/* skill category from the jewel type that grants it (weapon jewel → weapon). */
var _SKILL_CAT = null;
function armorSkillCat(name) {
  if (!_SKILL_CAT) {
    _SKILL_CAT = {};
    if (typeof DECORATIONS !== 'undefined') DECORATIONS.forEach(function (d) {
      if (d.skill && !(d.skill in _SKILL_CAT)) _SKILL_CAT[d.skill] = d.type;
      if (d.skill2 && !(d.skill2 in _SKILL_CAT)) _SKILL_CAT[d.skill2] = d.type;
    });
  }
  return _SKILL_CAT[name] || 'armor';
}
/* single "Active Skills" zone. Order within = Weapon-category skills first
   (by total level desc), then Armor-category skills (by total level desc). */
function armorSkillZones(order, totals) {
  var byLevel = function (a, b) {
    var d = (totals[b] || 0) - (totals[a] || 0);
    return d || a.localeCompare(b);
  };
  var weapon = order.filter(function (n) { return armorSkillCat(n) === 'weapon'; }).sort(byLevel);
  var armor = order.filter(function (n) { return armorSkillCat(n) !== 'weapon'; }).sort(byLevel);
  var rows = weapon.concat(armor).map(function (n) { return armorSkillRow(n, totals[n], armorSkillMax(n)); }).join('');
  return rows ? '<div class="armorb-skzone-h"><span>Active Skills</span></div><div class="armorb-skrows">' + rows + '</div>' : '';
}

function armorRenderBuild() {
  var host = document.getElementById('armor-build');
  if (!host) return;
  if (typeof armorDecoPrune === 'function') armorDecoPrune();
  var equipped = [];
  SLOT_ORDER.forEach(function (k) {
    var b = armorBuild[k]; if (!b) return;
    var p = armorPieceFor(b.setId, b.variant, k);
    if (p) equipped.push({ kind: k, set: armorFindSet(b.setId), variant: b.variant, piece: p, slots: armorPieceSlots(p, (armorFindSet(b.setId) || {}).rarity, b.transcend) });
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
      '<div class="armorb-slot-name">' + e.piece.name + '</div>' +
      (function() {
        var inds = '';
        for (var si = 0; si < 3; si++) {
          var slv = e.slots[si] || 0;
          if (!slv) continue;
          var scur = typeof armorDecoFor === 'function' ? armorDecoFor(k, si) : null;
          var sd = scur && typeof DECO_BY_ID !== 'undefined' ? DECO_BY_ID[scur] : null;
          inds += '<span class="armorb-slot-ind s' + slv + (sd ? ' has-deco' : '') + '" title="' + (sd ? sd.name : SLOT_GLYPH[slv] + ' — empty') + '">' + SLOT_NUM[slv] + '</span>';
        }
        return inds ? '<div class="armorb-slot-inds">' + inds + '</div>' : '';
      })() +
      '</div>';
  }).join('');

  // ── weapon slot card (always present, 3×③) ──
  var wInds = '';
  for (var wsi = 0; wsi < 3; wsi++) {
    var wc0 = typeof armorDecoFor === 'function' ? armorDecoFor('Weapon', wsi) : null;
    var wd0 = wc0 && typeof DECO_BY_ID !== 'undefined' ? DECO_BY_ID[wc0] : null;
    wInds += '<span class="armorb-slot-ind s3' + (wd0 ? ' has-deco' : '') + '" title="' + (wd0 ? wd0.name : '③ — empty') + '">' + SLOT_NUM[3] + '</span>';
  }
  slotCards = '<div class="armorb-slot filled armorb-weapon-card">' +
    '<div class="armorb-slot-ic"><span class="armor-pc-ic armorb-weapon-ic">⚔</span></div>' +
    '<div class="armorb-slot-kind">Weapon</div>' +
    '<div class="armorb-slot-name">3 × ③ Deco Slots</div>' +
    '<div class="armorb-slot-inds">' + wInds + '</div>' +
  '</div>' + slotCards;

  // ── weapon deco rows (built before early-return so both paths share them) ──
  var aDecoRows = '';
  if (typeof armorDecosForSlot === 'function') {
    var armorSlots = armorDecosForSlot('Armor');
    if (armorSlots && armorSlots.length) {
      for (var ai = 0; ai < armorSlots.length; ai++) {
        var lv = armorSlots[ai];
        var acur = typeof armorDecoFor === 'function' ? armorDecoFor('Armor', ai) : null;
        var ad = acur && typeof DECO_BY_ID !== 'undefined' ? DECO_BY_ID[acur] : null;
        aDecoRows +=
          '<div class="armorb-deco-row' + (ad ? ' filled' : '') + '">' +
            '<span class="armorb-deco-lv s' + lv + '">' + SLOT_NUM[lv] + '</span>' +
            '<div class="armorb-deco-wrap">' +
              '<input class="armorb-deco-search" type="text"' +
                ' value="' + (ad ? ad.name.replace(/"/g, '&quot;') : '') + '"' +
                ' placeholder="Search skill or name…"' +
                ' data-kind="Armor" data-idx="' + ai + '" data-lv="' + lv + '" data-type="armor"' +
                ' data-selected="' + (acur || '') + '"' +
                ' oninput="armorDecoSearchFilter(this)"' +
                ' onfocus="armorDecoSearchOpen(this)"' +
                ' onclick="event.stopPropagation()" />' +
              (ad ? '<button class="armorb-deco-clr" title="Clear this slot" tabindex="-1" onmousedown="event.preventDefault()" onclick="event.stopPropagation(); armorSetDeco(\'Armor\', ' + ai + ', \'\')">\u2715</button>' : '') +
              '<div class="armorb-deco-dd" style="display:none"></div>' +
            '</div>' +
          '</div>';
      }
    }
  }

  var wDecoRows = '';
  if (typeof armorDecosForSlot === 'function') {
    for (var wi = 0; wi < 3; wi++) {
      var wcur = typeof armorDecoFor === 'function' ? armorDecoFor('Weapon', wi) : null;
      var wd = wcur && typeof DECO_BY_ID !== 'undefined' ? DECO_BY_ID[wcur] : null;
      wDecoRows +=
        '<div class="armorb-deco-row' + (wd ? ' filled' : '') + '">' +
          '<span class="armorb-deco-lv s3">' + SLOT_NUM[3] + '</span>' +
          '<div class="armorb-deco-wrap">' +
            '<input class="armorb-deco-search" type="text"' +
              ' value="' + (wd ? wd.name.replace(/"/g, '&quot;') : '') + '"' +
              ' placeholder="Search weapon decoration…"' +
              ' data-kind="Weapon" data-idx="' + wi + '" data-lv="3" data-type="weapon"' +
              ' data-selected="' + (wcur || '') + '"' +
              ' oninput="armorDecoSearchFilter(this)"' +
              ' onfocus="armorDecoSearchOpen(this)"' +
              ' onclick="event.stopPropagation()" />' +
            (wd ? '<button class="armorb-deco-clr" title="Clear this slot" tabindex="-1" onmousedown="event.preventDefault()" onclick="event.stopPropagation(); armorSetDeco(\'Weapon\', ' + wi + ', \'\')">\u2715</button>' : '') +
            '<div class="armorb-deco-dd" style="display:none"></div>' +
          '</div>' +
        '</div>';
    }
  }

  // armor + weapon subsections + clear-all bar
  var armorHasDeco = (typeof armorKindHasDeco === 'function') && armorKindHasDeco('Armor');
  var armorSub =
    '<div class="armorb-deco-sub">' +
      '<div class="armorb-deco-subhd is-armor">' +
        '<span class="armorb-deco-subic armorb-armor-ic">🛡</span>' +
        '<span class="armorb-deco-sublabel">Armor</span>' +
      '</div>' + aDecoRows +
    '</div>';

  var weaponHasDeco = (typeof armorKindHasDeco === 'function') && armorKindHasDeco('Weapon');
  var weaponSub =
    '<div class="armorb-deco-sub">' +
      '<div class="armorb-deco-subhd is-weapon">' +
        '<span class="armorb-deco-subic armorb-weapon-ic">⚔</span>' +
        '<span class="armorb-deco-sublabel">Weapon</span>' +
      '</div>' + wDecoRows +
    '</div>';
  var anyDeco = (typeof armorDecoHasAny === 'function') && armorDecoHasAny();
  // "Clear all decorations" button removed for now — reworking the clear flow.
  var clearAllBar = '';

  if (!equipped.length) {
    var weapOnlyPanel = '<div class="armorb-deco-panel">' + clearAllBar + weaponSub + '</div>';
    // even with no armor, surface skills coming from the charm + weapon decos
    var emptyTotals = {}, emptyOrder = [];
    var eDeco = (typeof armorDecoSkillTotals === 'function') ? armorDecoSkillTotals() : {};
    Object.keys(eDeco).forEach(function (n) {
      if (!(n in emptyTotals)) { emptyTotals[n] = 0; emptyOrder.push(n); }
      emptyTotals[n] += eDeco[n];
    });
    armorCharmSkillContribs().forEach(function (sc) {
      if (!(sc[0] in emptyTotals)) { emptyTotals[sc[0]] = 0; emptyOrder.push(sc[0]); }
      emptyTotals[sc[0]] += (sc[1] || 0);
    });
    emptyOrder.sort(armorMakeSkillCmp(emptyTotals));
    var emptySkillHtml = emptyOrder.map(function (n) {
      var max = armorSkillMax(n), cur = emptyTotals[n];
      var over = max && cur > max, maxed = max && cur === max;
      var cls = over ? ' over' : (maxed ? ' maxed' : '');
      return '<span class="armorb-skill' + cls + '">' + n + '<span class="armorb-skill-lv">' + (max ? cur + '/' + max : cur) + '</span></span>';
    }).join('');
    var emptySkillsBlock = emptyOrder.length
      ? '<div class="armorb-tot-block" style="margin:0.5rem 0 0"><div class="armorb-tot-h">Skills</div><div class="armorb-skills">' + emptySkillHtml + '</div></div>'
      : '';
    host.innerHTML =
      '<div class="armorb-card"><div class="armorb-head">' +
        '<span class="armorb-title">⚒ Your Build</span><span class="armorb-count">0 / 5</span></div>' +
        emptySkillsBlock +
        '<div class="armorb-tot-block" style="margin:0.5rem 0 0"><div class="armorb-tot-h">Charm <span class="armorb-tot-sub">craftable</span></div>' + armorCharmPanelHtml() + '</div>' +
        '<div class="armorb-tot-block" style="margin:0.5rem 0 0"><div class="armorb-tot-h">Weapon Deco Slots <span class="armorb-tot-sub">3 × ③</span></div>' + weapOnlyPanel + '</div>' +
        '<div class="armorb-hint">Tap <b>+ Equip</b> on any piece below to add it here. Mix pieces from different sets — skills, slots and set/group thresholds tally automatically.</div>' +
        armorCodeBar() + '</div>';
    return;
  }

  // armor deco slots display
  var allArmorSlots = equipped.reduce(function(sum, eq) {
    return sum + (eq.slots ? eq.slots.reduce(function(a,b){return a+b;}, 0) : 0);
  }, 0);
  var armorSlotBreakdown = equipped.map(function(eq) {
    var s = eq.slots || [0,0,0];
    return (s[0] ? s[0] + '×①' : '') + (s[1] ? ' ' + s[1] + '×②' : '') + (s[2] ? ' ' + s[2] + '×③' : '');
  }).join(' + ');
  var armorDecoPanel = '<div class="armorb-deco-panel">' + armorSub + '</div>';

  var skillTotals = {}, order = [];
  // Set-bonus + group names are shown as their own chips (end of summary), so
  // exclude them from the regular per-skill list even when γ pieces list them
  // as innate skills.
  var _bonusNameSet = {}; armorAllSetBonuses().forEach(function (b) { _bonusNameSet[b.name] = 1; });
  var _groupNameSet = {}; armorAllGroups().forEach(function (g) { _groupNameSet[g.name] = 1; });
  var isBonusOrGroup = function (n) { return _bonusNameSet[n] || _groupNameSet[n]; };
  equipped.forEach(function (e) {
    e.piece.skills.forEach(function (sk) {
      if (isBonusOrGroup(sk[0])) return;
      if (!(sk[0] in skillTotals)) { skillTotals[sk[0]] = 0; order.push(sk[0]); }
      skillTotals[sk[0]] += (sk[1] || 0);
    });
  });
  var decoTotals = (typeof armorDecoSkillTotals === 'function') ? armorDecoSkillTotals() : {};
  Object.keys(decoTotals).forEach(function (n) {
    if (isBonusOrGroup(n)) return;
    if (!(n in skillTotals)) { skillTotals[n] = 0; order.push(n); }
    skillTotals[n] += decoTotals[n];
  });
  // fold in the equipped charm's skills (craftable or custom)
  armorCharmSkillContribs().forEach(function (sc) {
    if (isBonusOrGroup(sc[0])) return;
    if (!(sc[0] in skillTotals)) { skillTotals[sc[0]] = 0; order.push(sc[0]); }
    skillTotals[sc[0]] += (sc[1] || 0);
  });
  order.sort(armorMakeSkillCmp(skillTotals));
  var skillRowsHtml = armorSkillZones(order, skillTotals);

  var slotCount = { 1: 0, 2: 0, 3: 0 };
  equipped.forEach(function (e) { e.slots.forEach(function (lv) { if (lv) slotCount[lv]++; }); });
  slotCount[3] += 3; // weapon always contributes 3×③
  var totalSlots = slotCount[1] + slotCount[2] + slotCount[3];
  var slotSummary = totalSlots
    ? [3,2,1].filter(function (lv) { return slotCount[lv]; }).map(function (lv) {
        return '<span class="armorb-slotpill s' + lv + '"><span class="armorb-slotpill-d">' + SLOT_NUM[lv] + '</span>×' + slotCount[lv] + '</span>';
      }).join('')
    : '<span class="armorb-none">no slots</span>';

  // build deco panel HTML — weapon subsection + one subsection per armor piece
  var decoListHtml = '';
  if (typeof armorDecosForSlot === 'function') {
    var armorSubs = '';
    equipped.forEach(function (eq) {
      var transToggle = armorCanTranscend(eq.set && eq.set.rarity)
        ? '<label class="armorb-pc-trans' + (armorBuild[eq.kind] && armorBuild[eq.kind].transcend ? ' on' : '') + '" title="Transcend (TU4) re-aligns this piece\u2019s deco slots" onclick="event.stopPropagation()">' +
            '<input type="checkbox"' + (armorBuild[eq.kind] && armorBuild[eq.kind].transcend ? ' checked' : '') + ' onchange="armorTogglePieceTranscend(\'' + eq.kind + '\', this.checked)">' +
            '<span>Transcend</span></label>'
        : '';
      var pieceRows = [];
      for (var i = 0; i < 3; i++) {
        var lv = eq.slots[i] || 0;
        if (!lv) continue;
        var cur = typeof armorDecoFor === 'function' ? armorDecoFor(eq.kind, i) : null;
        var d = cur && typeof DECO_BY_ID !== 'undefined' ? DECO_BY_ID[cur] : null;
        pieceRows.push({ lv: lv, html:
          '<div class="armorb-deco-row' + (d ? ' filled' : '') + '">' +
            '<span class="armorb-deco-lv s' + lv + '">' + SLOT_NUM[lv] + '</span>' +
            '<div class="armorb-deco-wrap">' +
              '<input class="armorb-deco-search" type="text"' +
                ' value="' + (d ? d.name.replace(/"/g, '&quot;') : '') + '"' +
                ' placeholder="Search name or skill…"' +
                ' data-kind="' + eq.kind + '" data-idx="' + i + '" data-lv="' + lv + '" data-type="armor"' +
                ' data-selected="' + (cur || '') + '"' +
                ' oninput="armorDecoSearchFilter(this)"' +
                ' onfocus="armorDecoSearchOpen(this)"' +
                ' onclick="event.stopPropagation()" />' +
              (d ? '<button class="armorb-deco-clr" title="Clear this slot" tabindex="-1" onmousedown="event.preventDefault()" onclick="event.stopPropagation(); armorSetDeco(\'' + eq.kind + '\', ' + i + ', \'\')">\u2715</button>' : '') +
              '<div class="armorb-deco-dd" style="display:none"></div>' +
            '</div>' +
          '</div>'
        });
      }
      if (!pieceRows.length) {
        // piece with no deco slots — still show it (with unequip) so it's visible
        armorSubs +=
          '<div class="armorb-deco-sub">' +
            '<div class="armorb-deco-subhd is-armor">' +
              '<span class="armorb-deco-subic">' + armorSlotIcon(eq.kind, eq.set && eq.set.rarity) + '</span>' +
              '<span class="armorb-deco-sublabel"><b class="armorb-deco-kind">' + eq.kind + '</b><span class="armorb-deco-setname">' + eq.piece.name + '</span></span>' +
              '<span class="armorb-deco-noslot">no slots</span>' + transToggle +
              '<button class="armorb-deco-unequip" title="Remove ' + eq.kind + '" onclick="armorUnequip(\'' + eq.kind + '\')">\u2715</button>' +
            '</div>' +
          '</div>';
        return;
      }
      pieceRows.sort(function (a, b) { return b.lv - a.lv; });
      var hasD = (typeof armorKindHasDeco === 'function') && armorKindHasDeco(eq.kind);
      armorSubs +=
        '<div class="armorb-deco-sub">' +
          '<div class="armorb-deco-subhd is-armor">' +
            '<span class="armorb-deco-subic">' + armorSlotIcon(eq.kind, eq.set && eq.set.rarity) + '</span>' +
            '<span class="armorb-deco-sublabel"><b class="armorb-deco-kind">' + eq.kind + '</b><span class="armorb-deco-setname">' + eq.piece.name + '</span></span>' + transToggle +
            '<button class="armorb-deco-unequip" title="Remove ' + eq.kind + '" onclick="armorUnequip(\'' + eq.kind + '\')">\u2715</button>' +
          '</div>' + pieceRows.map(function (r) { return r.html; }).join('') +
        '</div>';
    });
    decoListHtml = '<div class="armorb-deco-panel">' + clearAllBar + weaponSub + armorSubs + '</div>';
  }

  var setCounts = {}, setOrder = [], setMeta = {}, groupCounts = {};
  equipped.forEach(function (e) {
    if (e.set.bonus && e.set.bonus.name) {
      var bn = e.set.bonus.name;
      if (!(bn in setCounts)) { setCounts[bn] = 0; setOrder.push(bn); setMeta[bn] = e.set.bonus; }
      setCounts[bn]++;
    }
    var pb = e.piece && e.piece.setBonus;
    if (pb && pb.name) {
      var pn = pb.name;
      if (!(pn in setCounts)) { setCounts[pn] = 0; setOrder.push(pn); setMeta[pn] = { name: pn, tiers: armorBonusTiers(pn) }; }
      setCounts[pn]++;
    }
    var vr = e.set.variants[e.variant];
    var g = (e.piece && e.piece.group) || (vr && vr.group);
    if (g) groupCounts[g.name] = (groupCounts[g.name] || 0) + 1;
  });
  // Weapon's rolled Set Bonus + Group skill each add +1 piece toward their tiers.
  var wpRoll = armorBuild.weapon;
  if (wpRoll) {
    if (wpRoll.bonus) {
      var wb = wpRoll.bonus;
      if (!(wb in setCounts)) { setCounts[wb] = 0; setOrder.push(wb); setMeta[wb] = { name: wb, tiers: armorBonusTiers(wb) }; }
      setCounts[wb]++;
    }
    if (wpRoll.group) groupCounts[wpRoll.group] = (groupCounts[wpRoll.group] || 0) + 1;
  }

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
      '<div class="armorb-bonus-h"><img class="sb-ico" src="images/setbonus-icon.png" alt=""> ' + bonus.name + '</div>' + bonusRows(bonus.tiers, cnt) + '</div>');
  });
  Object.keys(groupCounts).forEach(function (gname) {
    var cnt = groupCounts[gname];
    var tiers = armorGroupTiers(gname); if (!tiers) return;
    var anyOn = tiers.some(function (t) { return cnt >= t[1]; });
    bonusBlocks.push('<div class="armorb-bonus group ' + (anyOn ? 'live' : '') + '">' +
      '<div class="armorb-bonus-h"><img class="sb-ico" src="images/group-skill-icon.png" alt=""> ' + gname + '</div>' + bonusRows(tiers, cnt) + '</div>');
  });

  // Append Set Bonus + Group Skill chips to the END of the Skills summary,
  // each labelled with tier progress (count / next threshold, e.g. 2/4, 1/2).
  // Order: active set bonuses → active groups → inactive set bonuses → inactive
  // groups. "Active" = count reached at least the first tier's threshold.
  var chipActiveSet = '', chipActiveGroup = '', chipDeadSet = '', chipDeadGroup = '';
  setOrder.forEach(function (bn) {
    var bonus = setMeta[bn], cnt = setCounts[bn];
    var sorted = bonus.tiers.slice().sort(function (a, b) { return a[1] - b[1]; });
    var active = cnt >= sorted[0][1];
    var cls = cnt >= sorted[sorted.length - 1][1] ? ' maxed' : (active ? ' live' : '');
    var chip = '<span class="armorb-skill setbonus' + cls + '">' + armorEsc(bn) +
      '<span class="armorb-skill-lv">' + armorTierProg(bonus.tiers, cnt) + '</span></span>';
    if (active) chipActiveSet += chip; else chipDeadSet += chip;
  });
  Object.keys(groupCounts).forEach(function (gname) {
    var tiers = armorGroupTiers(gname); if (!tiers) return;
    var cnt = groupCounts[gname];
    var sorted = tiers.slice().sort(function (a, b) { return a[1] - b[1]; });
    var active = cnt >= sorted[0][1];
    var cls = cnt >= sorted[sorted.length - 1][1] ? ' maxed' : (active ? ' live' : '');
    var chip = '<span class="armorb-skill groupskill' + cls + '">' + armorEsc(gname) +
      '<span class="armorb-skill-lv">' + armorTierProg(tiers, cnt) + '</span></span>';
    if (active) chipActiveGroup += chip; else chipDeadGroup += chip;
  });
  var skillHtml = chipActiveSet + chipActiveGroup + chipDeadSet + chipDeadGroup;

  host.innerHTML =
    '<div class="armorb-card">' +
      '<div class="armorb-head"><span class="armorb-title">⚒ Your Build</span>' +
        '<span class="armorb-count">' + equipped.length + ' / 5</span>' +
        '<span class="armorb-headcode" title="Build code — tap to copy" onclick="armorCopyCode()">' + armorBuildCode() + '</span>' +
        '<button class="armorb-clear" onclick="armorClearBuild()">Clear</button></div>' +
      armorCreditHtml() +
      '<div class="armorb-body">' +
        '<div class="armorb-col armorb-col-equip">' +
          '<div class="armorb-charm-host"><div class="armorb-tot-h">Charm <span class="armorb-tot-sub">craftable</span></div>' + armorCharmPanelHtml() + '</div>' +
          armorWeaponPanelHtml() +
          '<div class="armorb-tot-block"><div class="armorb-tot-h">Deco Slots <span class="armorb-tot-sub">' + totalSlots + ' total</span>' +
            '</div>' +
            '<div class="armorb-slotpills">' + slotSummary + '</div>' +
            decoListHtml +
          '</div>' +
        '</div>' +
        '<div class="armorb-col armorb-col-results">' +
          '<div class="armorb-tot-block armorb-skillblock"><div class="armorb-tot-h">Skills</div>' +
            (skillRowsHtml || '<span class="armorb-none">—</span>') +
            (skillHtml ? '<div class="armorb-skzone-h"><span>Set &amp; Group</span></div><div class="armorb-skills">' + skillHtml + '</div>' : '') +
          '</div>' +
          (bonusBlocks.length ? '<div class="armorb-bonuses">' + bonusBlocks.join('') + '</div>' : '') +
        '</div>' +
      '</div>' +
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
    html += '<span class="armor-slot s' + lv + '">' + (lv ? SLOT_NUM[lv] : '–') + '</span>';
  }
  return html + '</span>';
}

function armorSkillChips(skills, group, setBonus, pieceBonus) {
  var chips = (skills || []).map(function (sk) {
    var lv = sk[1] ? '<span class="armor-skill-lv">' + sk[1] + '</span>' : '';
    return '<span class="armor-skill">' + sk[0] + lv + '</span>';
  });
  if (setBonus && setBonus.name) {
    chips.push('<span class="armor-skill setb" title="Set Bonus"><img class="sb-ico" src="images/setbonus-icon.png" alt=""> ' + setBonus.name + '</span>');
  }
  if (pieceBonus && pieceBonus.name) {
    chips.push('<span class="armor-skill setb" title="Borrowed Set Bonus — counts as 1 piece toward this set bonus"><img class="sb-ico" src="images/setbonus-icon.png" alt=""> ' + pieceBonus.name + ' <span class="armor-skill-lv">+1</span></span>');
  }
  if (group && group.name) {
    chips.push('<span class="armor-skill grp" title="Group Skill"><img class="sb-ico" src="images/group-skill-icon.png" alt=""> ' + group.name + '</span>');
  }
  if (!chips.length) return '<span class="armor-noskill">—</span>';
  return '<span class="armor-skills">' + chips.join('') + '</span>';
}

function armorPieceMatches(p, s, vr) {
  if (armorSlotFilter && p.slot !== armorSlotFilter) return false;
  if (!armorSearchTerm) return true;
  var hay = [s.set, s.element, (s.bonus && s.bonus.name) || '', p.name];
  if (s.bonus && s.bonus.tiers) s.bonus.tiers.forEach(function (t) { hay.push(t[0]); });
  var g = p.group || (vr && vr.group);
  if (g) hay.push(g.name);
  if (p.setBonus) hay.push(p.setBonus.name);
  p.skills.forEach(function (sk) { hay.push(sk[0]); });
  return hay.join(' ').toLowerCase().indexOf(armorSearchTerm) !== -1;
}

/* ════════════════════════════════════════════════════════
   Armor Set Picker — Quick select from ARMOR_PIECES
   ════════════════════════════════════════════════════════ */
function armorShowSetPicker() {
  if (typeof ARMOR_PIECES === 'undefined' || !ARMOR_PIECES.length) {
    alert('No armor sets available');
    return;
  }
  
  var modal = document.createElement('div');
  modal.className = 'armorb-modal';
  modal.innerHTML = '<div class="armorb-modal-bg" onclick="this.parentNode.remove()"></div>' +
    '<div class="armorb-modal-panel">' +
      '<div class="armorb-modal-head">' +
        '<span>Select Armor Set</span>' +
        '<button onclick="this.closest(\'.armorb-modal\').remove()">✕</button>' +
      '</div>' +
      '<div id="armorb-setlist" class="armorb-setlist"></div>' +
    '</div>';
  document.body.appendChild(modal);
  
  var setList = {};
  ARMOR_PIECES.forEach(function(p) {
    var key = p.setName + (p.variant ? ' ' + p.variant : '');
    if (!setList[key]) {
      setList[key] = {
        setName: p.setName,
        variant: p.variant,
        pieces: [],
        defense: 0,
        fireRes: 0, waterRes: 0, thunderRes: 0, iceRes: 0, dragonRes: 0,
        allSkills: {}
      };
    }
    setList[key].pieces.push(p);
    setList[key].defense += p.defense;
    setList[key].fireRes += p.fireRes;
    setList[key].waterRes += p.waterRes;
    setList[key].thunderRes += p.thunderRes;
    setList[key].iceRes += p.iceRes;
    setList[key].dragonRes += p.dragonRes;
    Object.keys(p.skills || {}).forEach(function(sk) {
      setList[key].allSkills[sk] = (setList[key].allSkills[sk] || 0) + p.skills[sk];
    });
  });
  
  var html = '';
  Object.keys(setList).sort().forEach(function(key) {
    var set = setList[key];
    var skillStr = Object.keys(set.allSkills).map(function(s) {
      return s + ' ' + set.allSkills[s];
    }).join(', ');
    var resStr = [
      set.fireRes !== 0 ? 'Fire ' + (set.fireRes > 0 ? '+' : '') + set.fireRes : '',
      set.waterRes !== 0 ? 'Water ' + (set.waterRes > 0 ? '+' : '') + set.waterRes : '',
      set.thunderRes !== 0 ? 'Thunder ' + (set.thunderRes > 0 ? '+' : '') + set.thunderRes : '',
      set.iceRes !== 0 ? 'Ice ' + (set.iceRes > 0 ? '+' : '') + set.iceRes : '',
      set.dragonRes !== 0 ? 'Dragon ' + (set.dragonRes > 0 ? '+' : '') + set.dragonRes : ''
    ].filter(function(x) { return x; }).join(' · ');
    
    html += '<div class="armorb-setcard" onclick="armorEquipSet(\'' + set.setName.replace(/'/g, "\\'") + '\', \'' + (set.variant || '').replace(/'/g, "\\'") + '\'); this.closest(\'.armorb-modal\').remove()">' +
      '<div class="armorb-setcard-name">' + key + '</div>' +
      '<div class="armorb-setcard-def">Def ' + set.defense + (resStr ? ' · ' + resStr : '') + '</div>' +
      (skillStr ? '<div class="armorb-setcard-skills">' + skillStr + '</div>' : '') +
    '</div>';
  });
  document.getElementById('armorb-setlist').innerHTML = html;
}

function armorEquipSet(setName, variant) {
  var piecesMap = {};
  ARMOR_PIECES.forEach(function(p) {
    if (p.setName === setName && p.variant === variant) {
      piecesMap[p.piece.toLowerCase()] = p;
    }
  });
  
  var pieceMap = {
    'head': 'Head', 'chest': 'Chest', 'arms': 'Arms', 'waist': 'Waist', 'legs': 'Legs'
  };
  
  Object.keys(pieceMap).forEach(function(slot) {
    var piece = piecesMap[pieceMap[slot]];
    if (piece) {
      armorEquip(slot, setName, variant, piece);
    }
  });
  armorRender();
}

function armorMatchesSet(s) {
  if (!armorSearchTerm) return true;
  var hay = [s.set, s.element, (s.bonus && s.bonus.name) || ''];
  ['α', 'β', 'γ'].forEach(function (v) {
    var vr = s.variants[v]; if (!vr) return;
    if (vr.group) hay.push(vr.group.name);
    vr.pieces.forEach(function (p) {
      hay.push(p.name);
      if (p.setBonus) hay.push(p.setBonus.name);
      p.skills.forEach(function (sk) { hay.push(sk[0]); });
    });
    vr.bonus && vr.bonus;
  });
  if (s.bonus && s.bonus.tiers) s.bonus.tiers.forEach(function (t) { hay.push(t[0]); });
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
          '<td class="armor-pc-skills">' + armorSkillChips(p.skills, p.group || vr.group, s.bonus, p.setBonus) + '</td>' +
          '<td class="armor-pc-eq">' +
            (isOn
              ? '<button class="armor-eqbtn on" title="Remove" onclick="armorUnequip(\'' + p.slot + '\')">✓</button>'
              : '<button class="armor-eqbtn" title="Equip" onclick="armorEquip(\'' + s.id + '\',\'' + v + '\',\'' + p.slot + '\')">+</button>') +
          '</td></tr>';
      }).join('');

      cards.push('<div class="armor-set">' +
        '<div class="armor-set-head">' +
          '<div class="armor-set-titles">' +
            '<div class="armor-set-name">' + s.set + ' ' + v + armorRarityBadge(s.rarity) + ((vr.verified || s.verified) ? '<span class="armor-verif" title="Per-piece data verified against game8.co">✓ Verified</span>' : '') + ((vr.transcended || s.transcended) ? '<span class="armor-transc" title="Slot levels shown include bonus slots from Armor Transcendence">✦ Transcended</span>' : '') + '</div>' +
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

function armorDecoSearchFilter(input) {
  var term = (input.value || '').toLowerCase().trim();
  var dd = input.nextElementSibling;
  if (!dd || !dd.classList.contains('armorb-deco-dd')) return;
  
  var lv = parseInt(input.dataset.lv) || 0;
  var type = input.dataset.type || 'armor';
  var items = dd.querySelectorAll('.armorb-deco-dd-item:not(.armorb-deco-dd-clear)');
  var hasMatch = false;
  
  items.forEach(function(item) {
    var decoId = item.dataset.decoId;
    var deco = decoId && typeof DECO_BY_ID !== 'undefined' ? DECO_BY_ID[decoId] : null;
    if (!deco) { item.style.display = 'none'; return; }
    
    // Filter by equipType (armor/weapon)
    if (deco.type && deco.type !== type) { item.style.display = 'none'; return; }
    
    // Filter by slot level — a slot of level `lv` accepts any deco of slot ≤ lv
    if (deco.slot > lv) { item.style.display = 'none'; return; }
    
    // Filter by search term (name + skill)
    if (term) {
      var hay = [deco.name, deco.skill, deco.skill2 || ''].join(' ').toLowerCase();
      if (hay.indexOf(term) === -1) { item.style.display = 'none'; return; }
    }
    
    item.style.display = 'flex';
    hasMatch = true;
  });
}

function armorDecoSearchOpen(input) {
  var dd = input.nextElementSibling;
  if (!dd || !dd.classList.contains('armorb-deco-dd')) return;
  
  var lv = parseInt(input.dataset.lv) || 0;
  var type = input.dataset.type || 'armor';
  var cur = input.dataset.selected || '';
  
  if (typeof DECORATIONS === 'undefined' || !DECORATIONS.length) {
    dd.innerHTML = '<div class="armorb-deco-dd-item armorb-deco-dd-clear">No decorations available</div>';
    dd.style.display = 'block';
    return;
  }
  
  var filtered = DECORATIONS.filter(function(d) {
    // Match type (armor/weapon)
    if (d.type && d.type !== type) return false;
    // A slot of level `lv` accepts any decoration of slot ≤ lv
    if (parseInt(d.slot) > lv) return false;
    return true;
  });
  // bigger jewels first (slot 3 → 1), then dual-skill last within a slot, then name
  filtered.sort(function(a, b) {
    if (a.slot !== b.slot) return b.slot - a.slot;
    var ad = a.skill2 ? 1 : 0, bd = b.skill2 ? 1 : 0;
    if (ad !== bd) return ad - bd;
    return a.name.localeCompare(b.name);
  });
  
  var html = '';
  filtered.forEach(function(d) {
    var isSelected = cur === d.id;
    var ds = d.slot;
    html += '<div class="armorb-deco-dd-item' + (isSelected ? ' selected' : '') + '" data-deco-id="' + d.id + '" onmousedown="event.preventDefault(); event.stopPropagation(); armorSetDeco(\'' + input.dataset.kind + '\', ' + input.dataset.idx + ', \'' + d.id + '\')">' +
      '<span class="armorb-deco-dd-slot s' + ds + '">' + SLOT_NUM[ds] + '</span>' +
      '<span class="armorb-deco-dd-name">' + d.name + '</span>' +
      (d.skill ? '<span class="armorb-deco-dd-skill">' + d.skill + ' ' + d.lv + (d.skill2 ? ' + ' + d.skill2 + ' ' + d.lv2 : '') + '</span>' : '') +
    '</div>';
  });
  
  if (!html) {
    html = '<div class="armorb-deco-dd-item armorb-deco-dd-clear">No ' + type + ' decorations for slot ' + SLOT_GLYPH[lv] + '</div>';
  } else {
    html += '<div class="armorb-deco-dd-item armorb-deco-dd-clear" onmousedown="event.preventDefault(); event.stopPropagation(); armorSetDeco(\'' + input.dataset.kind + '\', ' + input.dataset.idx + ', \'\')">Clear</div>';
  }
  
  dd.innerHTML = html;
  dd.style.display = 'block';
  // show ALL options on open (don't pre-filter by the current value); position after full height is known
  armorDecoPositionDD(input, dd);
  try { input.select(); } catch(e){}
  
  document.addEventListener('mousedown', function closeDD(e) {
    var wrap = input.closest('.armorb-deco-wrap');
    if (!wrap || (!wrap.contains(e.target) && !dd.contains(e.target))) {
      dd.style.display = 'none';
      document.removeEventListener('mousedown', closeDD);
      window.removeEventListener('scroll', repos, true);
      window.removeEventListener('resize', repos);
    }
  });
  function repos(){ if (dd.style.display !== 'none') armorDecoPositionDD(input, dd); }
  window.addEventListener('scroll', repos, true);
  window.addEventListener('resize', repos);
}

// Position the fixed dropdown relative to its input (escapes overflow:hidden ancestors)
function armorDecoPositionDD(input, dd) {
  var r = input.getBoundingClientRect();
  var ddH = dd.offsetHeight || 200;
  var vh = window.innerHeight;
  var spaceBelow = vh - r.bottom;
  dd.style.width = r.width + 'px';
  dd.style.left = r.left + 'px';
  // flip above the input when there isn't enough room below
  if (spaceBelow < ddH + 8 && r.top > spaceBelow) {
    dd.style.top = Math.max(4, r.top - ddH - 2) + 'px';
  } else {
    dd.style.top = (r.bottom + 2) + 'px';
  }
}

function armorSetDeco(kind, idx, decoId) {
  if (typeof armorSetDecoFor === 'function') {
    armorSetDecoFor(kind, idx, decoId);
  }
  // Re-render the BUILD panel (#armor-build) — that's where the deco slots,
  // dropdowns and skill totals live. Rebuilding its HTML also wipes the open
  // dropdown so it disappears after a pick. (armorRender only touches the set
  // listing, which is why the deco wasn't showing up before.)
  if (typeof armorRenderBuild === 'function') armorRenderBuild();
  else if (typeof renderArmorBuilder === 'function') renderArmorBuilder();
}

/* ── charm picker (mirror of deco search, but no slot/type filtering) ── */
function armorCharmSearchFilter(input) {
  var term = (input.value || '').toLowerCase().trim();
  var dd = input.nextElementSibling;
  if (!dd || !dd.classList.contains('armorb-deco-dd')) return;
  dd.querySelectorAll('.armorb-deco-dd-item:not(.armorb-deco-dd-clear)').forEach(function(item) {
    var nm = item.dataset.charm;
    var c = nm && CHARM_BY_NAME[nm];
    if (!c) { item.style.display = 'none'; return; }
    var hay = (c.name + ' ' + c.skill).toLowerCase();
    item.style.display = (!term || hay.indexOf(term) !== -1) ? 'flex' : 'none';
  });
}

function armorCharmSearchOpen(input) {
  var dd = input.nextElementSibling;
  if (!dd || !dd.classList.contains('armorb-deco-dd')) return;
  var cur = input.dataset.selected || '';

  if (typeof CHARMS === 'undefined' || !CHARMS.length) {
    dd.innerHTML = '<div class="armorb-deco-dd-item armorb-deco-dd-clear">No charms available</div>';
    dd.style.display = 'block';
    return;
  }

  // sort a copy by skill name but keep each charm's ORIGINAL index for stable selection
  var sorted = CHARMS.map(function(c, i) { return { c: c, i: i }; })
    .sort(function(a, b) { return a.c.skill.localeCompare(b.c.skill) || a.c.name.localeCompare(b.c.name); });

  var html = '';
  sorted.forEach(function(e) {
    var c = e.c, sel = cur === c.name;
    html += '<div class="armorb-deco-dd-item' + (sel ? ' selected' : '') + '" data-charm="' + c.name.replace(/"/g, '&quot;') + '"' +
      ' onmousedown="event.preventDefault(); event.stopPropagation(); armorSetCharmIdx(' + e.i + ')">' +
      '<span class="armorb-deco-dd-slot armorb-charm-lv">\uD83E\uDDFF</span>' +
      '<span class="armorb-deco-dd-name">' + c.name + '</span>' +
      '<span class="armorb-deco-dd-skill">' + c.skill + ' ' + c.level + '</span>' +
    '</div>';
  });
  html += '<div class="armorb-deco-dd-item armorb-deco-dd-clear" onmousedown="event.preventDefault(); event.stopPropagation(); armorSetCharm(\'\')">Clear</div>';

  dd.innerHTML = html;
  dd.style.display = 'block';
  armorDecoPositionDD(input, dd);
  try { input.select(); } catch (e) {}

  document.addEventListener('mousedown', function closeDD(e) {
    var wrap = input.closest('.armorb-deco-wrap');
    if (!wrap || (!wrap.contains(e.target) && !dd.contains(e.target))) {
      dd.style.display = 'none';
      document.removeEventListener('mousedown', closeDD);
      window.removeEventListener('scroll', repos, true);
      window.removeEventListener('resize', repos);
    }
  });
  function repos() { if (dd.style.display !== 'none') armorDecoPositionDD(input, dd); }
  window.addEventListener('scroll', repos, true);
  window.addEventListener('resize', repos);
}

// Weapon rolled set-bonus + group-skill picker panel.
function armorWeaponPanelHtml() {
  var w = armorBuild.weapon || {};
  var bonuses = armorAllSetBonuses();
  var groups = armorAllGroups();
  var bOpts = '<option value="">— none —</option>' + bonuses.map(function (b) {
    return '<option value="' + armorEsc(b.name) + '"' + (b.name === w.bonus ? ' selected' : '') + '>' + armorEsc(b.name) + '</option>';
  }).join('');
  var gOpts = '<option value="">— none —</option>' + groups.map(function (g) {
    return '<option value="' + armorEsc(g.name) + '"' + (g.name === w.group ? ' selected' : '') + '>' + armorEsc(g.name) + '</option>';
  }).join('');
  var tierTxt = function (t) { return t ? t.map(function (x) { return x[0] + ' (' + x[1] + ')'; }).join(' · ') : ''; };
  var bTiers = w.bonus ? armorBonusTiers(w.bonus) : null;
  var gTiers = w.group ? armorGroupTiers(w.group) : null;
  return '<div class="armorb-charm-host armorb-weapon-host">' +
    '<div class="armorb-tot-h">Weapon <span class="armorb-tot-sub">rolled set bonus + group skill</span></div>' +
    '<div class="armorb-amu-section"><div class="armorb-amu-label">Set Bonus' +
      (bTiers ? ' <span class="armorb-amu-sub">' + armorEsc(tierTxt(bTiers)) + '</span>' : '') + '</div>' +
      '<select class="armorb-amu-sksel armorb-weapon-sel" onchange="armorSetWeaponBonus(this.value)">' + bOpts + '</select></div>' +
    '<div class="armorb-amu-section"><div class="armorb-amu-label">Group Skill' +
      (gTiers ? ' <span class="armorb-amu-sub">' + armorEsc(tierTxt(gTiers)) + '</span>' : '') + '</div>' +
      '<select class="armorb-amu-sksel armorb-weapon-sel" onchange="armorSetWeaponGroup(this.value)">' + gOpts + '</select></div>' +
  '</div>';
}
// Reusable charm UI fragments (card for the slots row + picker row)
function armorCharmCardHtml() {
  if (armorCharmMode() === 'custom') {
    var cc = armorCustomCharm();
    var filled = cc && cc.rarity;
    var hasSlots = cc && cc.slots;
    return '<div class="armorb-slot ' + (filled ? 'filled' : 'empty') + ' armorb-charm-card">' +
      (filled ? '<button class="armorb-x" title="Remove" onclick="armorSetCharmMode(\'craft\')">\u2715</button>' : '') +
      '<div class="armorb-slot-ic"><span class="armor-pc-ic armorb-charm-ic">\uD83E\uDDFF</span></div>' +
      '<div class="armorb-slot-kind">Charm</div>' +
      (filled
        ? '<div class="armorb-slot-name">Custom \u00b7 R' + cc.rarity + '</div>' +
          (hasSlots
            ? '<div class="armorb-slot-inds">' + armorAmuletSlotPips(cc.slots) + '</div>'
            : '<div class="armorb-charm-skill" style="font-size:0.62rem">pick slots</div>')
        : '<div class="armorb-slot-empty">\u2014 pick rarity \u2014</div>') +
    '</div>';
  }
  var c = armorCharmObj();
  return '<div class="armorb-slot ' + (c ? 'filled' : 'empty') + ' armorb-charm-card">' +
    (c ? '<button class="armorb-x" title="Remove" onclick="armorSetCharm(\'\')">\u2715</button>' : '') +
    '<div class="armorb-slot-ic"><span class="armor-pc-ic armorb-charm-ic">\uD83E\uDDFF</span></div>' +
    '<div class="armorb-slot-kind">Charm</div>' +
    (c ? '<div class="armorb-slot-name">' + c.name + '</div><div class="armorb-charm-skill">' + c.skill + ' ' + c.level + '</div>'
       : '<div class="armorb-slot-empty">\u2014 none \u2014</div>') +
  '</div>';
}
function armorCharmModeToggle() {
  var mode = armorCharmMode();
  return '<div class="armorb-charm-modes">' +
    '<button class="armorb-charm-mode' + (mode === 'craft' ? ' active' : '') + '" onclick="armorSetCharmMode(\'craft\')">Craftable</button>' +
    '<button class="armorb-charm-mode' + (mode === 'custom' ? ' active' : '') + '" onclick="armorSetCharmMode(\'custom\')">Custom</button>' +
  '</div>';
}
function armorCharmCraftBody() {
  var c = armorCharmObj();
  return '<div class="armorb-deco-row' + (c ? ' filled' : '') + '">' +
    '<span class="armorb-deco-lv armorb-charm-lv">\uD83E\uDDFF</span>' +
    '<div class="armorb-deco-wrap">' +
      '<input class="armorb-deco-search armorb-charm-search" type="text"' +
        ' value="' + (c ? c.name.replace(/"/g, '&quot;') : '') + '"' +
        ' placeholder="Search charm or skill\u2026"' +
        ' data-selected="' + (armorGetCharm() || '').replace(/"/g, '&quot;') + '"' +
        ' oninput="armorCharmSearchFilter(this)"' +
        ' onfocus="armorCharmSearchOpen(this)"' +
        ' onclick="event.stopPropagation()" />' +
      (c ? '<button class="armorb-deco-clr" title="Clear charm" tabindex="-1" onmousedown="event.preventDefault()" onclick="event.stopPropagation(); armorSetCharm(\'\')">\u2715</button>' : '') +
      '<div class="armorb-deco-dd" style="display:none"></div>' +
    '</div>' +
  '</div>';
}
function armorCharmCustomBody() {
  var c = armorCustomCharm();
  var rar = c ? c.rarity : 0;
  var rarBtns = [5, 6, 7, 8].map(function (r) {
    return '<button class="armorb-amu-rar' + (rar === r ? ' active' : '') + '" onclick="armorSetCustomRarity(' + r + ')">R' + r + '</button>';
  }).join('');
  var html = '<div class="armorb-amu-section"><div class="armorb-amu-label">Rarity</div>' +
    '<div class="armorb-amu-opts">' + rarBtns + '</div></div>';
  if (rar) {
    var opts = (AMULET_SLOTS[rar] || []).map(function (combo) {
      var sel = c.slots === combo;
      return '<button class="armorb-amu-slot' + (sel ? ' active' : '') + '" title="' + combo + '" onclick="armorSetCustomSlots(\'' + combo + '\')">' +
        '<span class="armorb-amu-slotpips">' + armorAmuletSlotPips(combo) + '</span></button>';
    }).join('');
    html += '<div class="armorb-amu-section"><div class="armorb-amu-label">Decoration Slots <span class="armorb-amu-sub">possible rolls</span></div>' +
      '<div class="armorb-amu-opts slots">' + opts + '</div></div>';

    // ── skills (constrained to rollable group outcomes, up to 3) ──
    var skills = armorCustomSkills();
    var esc = function (s) { return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); };
    var skillRows = skills.map(function (sk, i) {
      var nm = sk[0] || '';
      var lv = sk[1] || 0;
      var curVal = nm ? (nm + '|' + lv) : '';
      var opts = amuletSlotOptions(rar, skills, i, c.slots);
      // group options by skill name for readability
      var byName = {};
      opts.forEach(function (o) { (byName[o.name] = byName[o.name] || []).push(o.level); });
      var optsHtml = '<option value="">— pick rolled skill —</option>' + Object.keys(byName).sort().map(function (name) {
        return byName[name].sort(function (a, b) { return a - b; }).map(function (level) {
          var val = name + '|' + level;
          return '<option value="' + esc(val) + '"' + (val === curVal ? ' selected' : '') + '>' + esc(name) + ' ' + level + '</option>';
        }).join('');
      }).join('');
      return '<div class="armorb-amu-skrow">' +
        '<select class="armorb-amu-sksel" onchange="armorSetCustomSkillOutcome(' + i + ', this.value)">' + optsHtml + '</select>' +
        (nm ? '<span class="armorb-amu-sklv filled">Lv ' + lv + '</span>' : '<span class="armorb-amu-sklv">\u2013</span>') +
        '<button class="armorb-amu-skx" title="Remove skill" onclick="armorRemoveCustomSkill(' + i + ')">\u2715</button>' +
      '</div>';
    }).join('');
    html += '<div class="armorb-amu-section"><div class="armorb-amu-label">Skills <span class="armorb-amu-sub">only rolls possible at R' + rar + '</span></div>' +
      '<div class="armorb-amu-skills">' + skillRows +
      (armorCanAddCustomSkill() ? '<button class="armorb-amu-addsk" onclick="armorAddCustomSkill()">+ Add skill</button>' : '') +
      '</div></div>';

    // ── real decoration slots on the charm ──
    var defs = armorCharmSlotDefs();
    if (defs.length) {
      var decoRows = defs.map(function (def, i) {
        var cur = armorDecoFor('Charm', i);
        var d = cur && typeof DECO_BY_ID !== 'undefined' ? DECO_BY_ID[cur] : null;
        var lvCls = def.w ? 's1 amu-w' : ('s' + def.lv);
        var lvTxt = def.w ? '1<sup class="amu-wtag">W</sup>' : SLOT_NUM[def.lv];
        return '<div class="armorb-deco-row' + (d ? ' filled' : '') + '">' +
          '<span class="armorb-deco-lv ' + lvCls + '">' + lvTxt + '</span>' +
          '<div class="armorb-deco-wrap">' +
            '<input class="armorb-deco-search" type="text"' +
              ' value="' + (d ? d.name.replace(/"/g, '&quot;') : '') + '"' +
              ' placeholder="Search ' + def.type + ' decoration\u2026"' +
              ' data-kind="Charm" data-idx="' + i + '" data-lv="' + def.lv + '" data-type="' + def.type + '"' +
              ' data-selected="' + (cur || '') + '"' +
              ' oninput="armorDecoSearchFilter(this)"' +
              ' onfocus="armorDecoSearchOpen(this)"' +
              ' onclick="event.stopPropagation()" />' +
            (d ? '<button class="armorb-deco-clr" title="Clear this slot" tabindex="-1" onmousedown="event.preventDefault()" onclick="event.stopPropagation(); armorSetDeco(\'Charm\', ' + i + ', \'\')">\u2715</button>' : '') +
            '<div class="armorb-deco-dd" style="display:none"></div>' +
          '</div>' +
        '</div>';
      }).join('');
      html += '<div class="armorb-amu-section"><div class="armorb-amu-label">Slotted Decorations</div>' +
        '<div class="armorb-amu-decos">' + decoRows + '</div></div>';
    }
  }
  return html;
}
function armorCharmPanelHtml() {
  var mode = armorCharmMode();
  var body = (mode === 'custom') ? armorCharmCustomBody() : armorCharmCraftBody();
  var canClear = (mode === 'custom') ? !!armorCustomCharm() : !!armorCharmObj();
  var clearFn = (mode === 'custom') ? 'armorSetCharmMode(\'custom\')' : 'armorSetCharm(\'\')';
  return '<div class="armorb-deco-panel armorb-charm-panel">' +
    '<div class="armorb-deco-sub">' +
      '<div class="armorb-deco-subhd is-charm">' +
        '<span class="armorb-deco-subic armorb-charm-ic">\uD83E\uDDFF</span>' +
        '<span class="armorb-deco-sublabel">Charm</span>' +
        armorCharmModeToggle() +
      '</div>' +
      body +
    '</div>' +
  '</div>';
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
    '.armor-transc { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.38rem; letter-spacing: 0.03em; color: #b07ad8; border: 1px solid #b07ad866; background: rgba(176,122,216,0.12); border-radius: 999px; padding: 0.04rem 0.34rem; align-self: center; margin-left: 0.25rem; }',
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
    '.armor-pc-slots { text-align: center; white-space: nowrap; padding-right: 0.95rem; }',
    '.armor-slots { display: inline-flex; gap: 0.2rem; justify-content: center; }',
    '.armor-slot { display: inline-flex; align-items: center; justify-content: center; width: 0.74rem; height: 0.74rem; font-family: "Cinzel", serif; font-weight: 800; font-size: 0.44rem; line-height: 1; border-radius: 50%; border: 1.5px solid var(--slotc, #6a6a6a); color: #14110a; background: var(--slotc, #6a6a6a); }',
    '.armor-slot.s0 { color: var(--text-muted); background: transparent; border: 1.5px dashed var(--border); opacity: 0.6; }',
    '.armor-slot.s1 { --slotc: #5fd05f; } .armor-slot.s2 { --slotc: #57b6f7; } .armor-slot.s3 { --slotc: #f5c828; }',
    '.armor-skills { display: flex; flex-wrap: wrap; gap: 0.14rem; align-items: center; }',
    '.armor-pc-skills { width: auto; }',
    '.armor-skill { display: inline-flex; align-items: center; gap: 0.16rem; white-space: nowrap; font-family: "Crimson Pro", serif; font-size: 0.42rem; color: var(--text); background: var(--surface); border: 1px solid var(--border); border-radius: 999px; padding: 0.02rem 0.24rem 0.02rem 0.32rem; }',
    '.armor-skill-lv { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.36rem; color: #fff; background: var(--gold-light); border-radius: 999px; min-width: 0.62rem; text-align: center; padding: 0 0.08rem; }',
    '.armor-skill.grp { color: #2fa89a; border-color: #2f9a8c66; background: rgba(47,160,144,0.13); }',
    '.armor-skill.setb { color: #d8a94a; border-color: #c8a04066; background: rgba(184,136,26,0.12); }',
    '.sb-ico { height: 0.92em; width: auto; vertical-align: -0.16em; image-rendering: auto; filter: drop-shadow(0 1px 1px rgba(0,0,0,0.4)); }',
    '.armorb-bonus-h .sb-ico { height: 1.05em; vertical-align: -0.2em; }',
    '.armor-noskill { color: var(--text-muted); }',
    '.armor-bonuses { display: grid; grid-template-columns: 1fr 1fr; gap: 0.45rem; padding: 0.5rem 0.7rem 0.7rem; }',
    '.armor-bonus { border: 1px solid var(--border); border-radius: 8px; padding: 0.4rem 0.5rem; background: var(--surface); }',
    '.armor-bonus.set { border-color: #c8a04055; background: rgba(184,136,26,0.07); }',
    '.armor-bonus.group { border-color: #2f9a8c55; background: rgba(47,160,144,0.07); }',
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
    /* ── charm slot (craftable charms, violet accent) ── */
    '.armorb-charm-ic { color: #c79bf2; }',
    '.armorb-charm-card.filled { border-color: rgba(170,120,230,0.5) !important; box-shadow: 0 0 0 1px rgba(170,120,230,0.25) inset; }',
    '.armorb-charm-skill { font-size: 0.72rem; color: #c79bf2; margin-top: 0.15rem; font-weight: 600; }',
    '.armorb-charm-host { margin: 0.55rem 0.7rem 0; }',
    '.armorb-weapon-host .armorb-amu-section { padding-left: 0; padding-right: 0; }',
    '.armorb-weapon-sel { width: 100%; box-sizing: border-box; }',
    '.armorb-charm-panel { margin-top: 0.3rem; }',
    '.armorb-deco-subhd.is-charm { background: linear-gradient(90deg, rgba(150,100,220,0.18), transparent); }',
    '.armorb-charm-lv { background: rgba(150,100,220,0.28) !important; color: #dcc4f7 !important; }',
    /* ── custom amulet mode toggle + rarity/slot pickers ── */
    '.armorb-charm-modes { margin-left: auto; display: flex; gap: 0.2rem; }',
    '.armorb-charm-mode { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.46rem; letter-spacing: 0.02em; cursor: pointer; color: var(--text-muted); background: var(--card); border: 1px solid var(--border); border-radius: 999px; padding: 0.12rem 0.5rem; transition: all 0.12s; }',
    '.armorb-charm-mode.active { color: #fff; background: rgba(150,100,220,0.85); border-color: rgba(170,120,230,0.9); }',
    '.armorb-amu-section { padding: 0.4rem 0.55rem 0.1rem; }',
    '.armorb-amu-label { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.46rem; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.32rem; display: flex; align-items: baseline; gap: 0.4rem; }',
    '.armorb-amu-sub { font-family: "Crimson Pro", serif; font-weight: 400; font-size: 0.42rem; letter-spacing: 0; text-transform: none; color: var(--text-muted); opacity: 0.7; }',
    '.armorb-amu-opts { display: flex; flex-wrap: wrap; gap: 0.3rem; }',
    '.armorb-amu-rar { font-family: "Cinzel", serif; font-weight: 800; font-size: 0.5rem; cursor: pointer; color: var(--text-muted); background: var(--card); border: 1px solid var(--border); border-radius: 7px; padding: 0.22rem 0.55rem; transition: all 0.12s; }',
    '.armorb-amu-rar:hover { border-color: rgba(170,120,230,0.6); color: var(--text); }',
    '.armorb-amu-rar.active { color: #fff; background: rgba(150,100,220,0.85); border-color: rgba(170,120,230,0.9); }',
    '.armorb-amu-slot { display: inline-flex; align-items: center; cursor: pointer; background: var(--card); border: 1px solid var(--border); border-radius: 7px; padding: 0.26rem 0.5rem; transition: all 0.12s; }',
    '.armorb-amu-slot:hover { border-color: rgba(170,120,230,0.6); }',
    '.armorb-amu-slot.active { background: rgba(150,100,220,0.18); border-color: rgba(170,120,230,0.9); box-shadow: 0 0 0 1px rgba(170,120,230,0.3) inset; }',
    '.armorb-amu-slotpips { display: inline-flex; gap: 0.24rem; }',
    '.armorb-amu-slotpips .armorb-slot-ind { width: 0.9rem; height: 0.9rem; font-size: 0.52rem; }',
    '.armorb-amu-skills { display: flex; flex-direction: column; gap: 0.3rem; }',
    '.armorb-amu-skrow { display: flex; align-items: center; gap: 0.3rem; }',
    '.armorb-amu-sksel { flex: 1; min-width: 0; font-family: "Crimson Pro", serif; font-size: 0.52rem; color: var(--text); background: var(--card); border: 1px solid var(--border); border-radius: 6px; padding: 0.18rem 0.3rem; }',
    '.armorb-amu-skstep { display: inline-flex; align-items: center; gap: 0.18rem; flex-shrink: 0; }',
    '.armorb-amu-skbtn { width: 0.95rem; height: 0.95rem; display: inline-flex; align-items: center; justify-content: center; font-family: "Cinzel", serif; font-weight: 800; font-size: 0.55rem; line-height: 1; cursor: pointer; color: var(--text); background: var(--card); border: 1px solid var(--border); border-radius: 5px; }',
    '.armorb-amu-skbtn:hover:not([disabled]) { border-color: rgba(170,120,230,0.6); color: #fff; }',
    '.armorb-amu-skbtn[disabled] { opacity: 0.4; cursor: default; }',
    '.armorb-amu-sklv { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.46rem; color: var(--text-muted); min-width: 1.9rem; flex-shrink: 0; text-align: center; }',
    '.armorb-amu-sklv.filled { color: #dcc4f7; background: rgba(150,100,220,0.22); border-radius: 5px; padding: 0.12rem 0.2rem; }',
    '.armorb-amu-skx { width: 0.9rem; height: 0.9rem; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; font-size: 0.5rem; cursor: pointer; color: var(--text-muted); background: transparent; border: 1px solid var(--border); border-radius: 5px; }',
    '.armorb-amu-skx:hover { color: #d2602e; border-color: #d2602e88; }',
    '.armorb-amu-addsk { align-self: flex-start; font-family: "Cinzel", serif; font-weight: 700; font-size: 0.46rem; letter-spacing: 0.02em; cursor: pointer; color: rgba(170,120,230,0.95); background: rgba(150,100,220,0.12); border: 1px dashed rgba(170,120,230,0.5); border-radius: 6px; padding: 0.2rem 0.55rem; }',
    '.armorb-amu-addsk:hover { background: rgba(150,100,220,0.2); }',
    '.armorb-amu-decos { display: flex; flex-direction: column; gap: 0.28rem; }',
    '.armorb-slot-ind.amu-w { position: relative; overflow: visible; }',
    '.amu-wtag { position: absolute; top: -0.2rem; right: -0.24rem; width: 0.52rem; height: 0.52rem; display: flex; align-items: center; justify-content: center; font-family: "Cinzel", serif; font-size: 0.34rem; font-weight: 900; color: #fff; background: #c2691f; border: 1px solid rgba(0,0,0,0.3); border-radius: 50%; line-height: 1; }',
    '.armorb-charm-note { font-size: 0.6rem; font-weight: 600; color: #b89ad8; opacity: 0.85; margin-left: 0.3rem; letter-spacing: 0.02em; text-transform: uppercase; }',
    '.armorb-card { background: var(--card); border: 1px solid var(--gold-deep, #8a6a1e); border-radius: 12px; overflow: hidden; box-shadow: 0 2px 14px rgba(0,0,0,0.18); }',
    '.armorb-head { display: flex; align-items: center; gap: 0.5rem; padding: 0.55rem 0.7rem; background: linear-gradient(90deg, rgba(184,136,26,0.16), transparent); border-bottom: 1px solid var(--border); }',
    '.armorb-title { font-family: "Cinzel", serif; font-weight: 800; font-size: 0.6rem; color: var(--gold-light); letter-spacing: 0.03em; }',
    '.armorb-count { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.44rem; color: var(--text-muted); border: 1px solid var(--border); border-radius: 999px; padding: 0.06rem 0.4rem; }',
    '.armorb-headcode { font-family: "DM Mono", "Courier New", monospace; font-size: 0.42rem; letter-spacing: 0.04em; color: var(--text-muted); background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 0.12rem 0.4rem; cursor: pointer; transition: all 0.12s; white-space: nowrap; }',
    '.armorb-headcode:hover { color: var(--gold-light); border-color: var(--gold-light); }',
    '.armorb-clear { margin-left: auto; font-family: "Cinzel", serif; font-weight: 700; font-size: 0.44rem; cursor: pointer; color: var(--text-muted); background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 0.18rem 0.5rem; transition: all 0.12s; }',
    '.armorb-clear:hover { color: #d2602e; border-color: #d2602e; }',
    '.armorb-codebar { display: flex; flex-direction: column; gap: 0.4rem; padding: 0.5rem 0.7rem 0.65rem; border-top: 1px solid var(--border); margin-top: 0.1rem; }',
    '.armorb-credit { display: flex; align-items: center; gap: 0.5rem; padding: 0.32rem 0.7rem; font-family: "Crimson Pro", serif; font-style: italic; font-size: 0.52rem; color: var(--text-muted); background: linear-gradient(90deg, rgba(184,136,26,0.12), transparent); border-bottom: 1px solid var(--border); text-decoration: none; cursor: pointer; transition: background 0.15s; }',
    'a.armorb-credit:hover { background: linear-gradient(90deg, rgba(176,69,30,0.16), transparent); }',
    '.armorb-credit-txt { font-style: italic; }',
    '.armorb-credit-txt b { font-style: normal; font-weight: 700; color: var(--text); }',
    '.armorb-credit-yt { display: inline-flex; align-items: center; gap: 0.22rem; margin-left: auto; font-family: "Cinzel", serif; font-style: normal; font-weight: 700; font-size: 0.46rem; letter-spacing: 0.02em; color: #fff; background: #c4302b; padding: 0.16rem 0.4rem; border-radius: 4px; flex-shrink: 0; }',
    'a.armorb-credit:hover .armorb-credit-yt { background: #e0342e; }',
    '.armorb-preset-row, .armorb-code-row { display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap; }',
    '.armorb-preset-sel { flex: 1; min-width: 8rem; font-family: "Crimson Pro", serif; font-weight: 600; font-size: 0.5rem; color: var(--text); background: var(--surface); border: 1px solid rgba(184,136,26,0.45); border-radius: 4px; padding: 0.2rem 0.3rem; cursor: pointer; }',
    '.armorb-preset-sel:focus { outline: none; border-color: var(--gold-light); }',
    '.armorb-code-label { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.4rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); }',
    '.armorb-code-input { flex: 1; min-width: 6rem; font-family: "DM Mono", "Courier New", monospace; font-size: 0.46rem; color: var(--text); background: var(--surface); border: 1px solid var(--border); border-radius: 7px; padding: 0.26rem 0.45rem; }',
    '.armorb-code-input:focus { outline: none; border-color: var(--gold-light); }',
    '.armorb-code-btn { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.42rem; cursor: pointer; color: var(--text); background: var(--card); border: 1px solid var(--border); border-radius: 7px; padding: 0.26rem 0.55rem; transition: all 0.12s; }',
    '.armorb-code-btn:hover { color: var(--gold-light); border-color: var(--gold-light); }',
    '.armorb-code-btn.apply { color: #fff; background: var(--gold-light); border-color: var(--gold-light); }',
    '.armorb-code-btn.apply:hover { filter: brightness(1.08); }',
    '.armorb-code-btn.save { color: #fff; background: #b07a1e; border-color: #b07a1e; }',
    '.armorb-code-btn.save:hover { filter: brightness(1.08); color: #fff; }',
    '.armorb-code-btn.ghost { color: var(--text-muted); }',
    '.armorb-save-row { display: flex; align-items: center; gap: 0.35rem; }',
    /* saved-builds list */
    '.armorb-saved-list { display: flex; flex-direction: column; gap: 0.22rem; }',
    '.armorb-saved-item { display: flex; align-items: stretch; gap: 0.25rem; }',
    '.armorb-saved-load { flex: 1; display: flex; align-items: center; gap: 0.32rem; text-align: left; font-family: "Crimson Pro", serif; font-weight: 600; font-size: 0.52rem; color: var(--text); background: var(--surface); border: 1px solid var(--border); border-radius: 5px; padding: 0.26rem 0.45rem; cursor: pointer; transition: all 0.12s; }',
    '.armorb-saved-load:hover { border-color: var(--gold-light); background: rgba(184,136,26,0.08); }',
    '.armorb-saved-star { color: #b07a1e; font-size: 0.5rem; flex-shrink: 0; }',
    '.armorb-saved-del { flex-shrink: 0; width: 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 0.56rem; color: var(--text-muted); background: var(--surface); border: 1px solid var(--border); border-radius: 5px; cursor: pointer; transition: all 0.12s; }',
    '.armorb-saved-del:hover { color: #fff; background: #c0392b; border-color: #c0392b; }',
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
    '.armorb-decos { display: flex; flex-direction: column; gap: 0.18rem; margin-top: 0.3rem; width: 100%; }',
    '.armorb-deco { display: flex; align-items: center; gap: 0.22rem; }',
    '.armorb-deco-slot { font-family: "Cinzel", serif; font-weight: 800; font-size: 0.46rem; flex-shrink: 0; }',
    '.armorb-deco-slot.s1 { color: #6a7a6a; } .armorb-deco-slot.s2 { color: #3a78a8; } .armorb-deco-slot.s3 { color: #b8881a; }',
    '.armorb-deco-sel { flex: 1; min-width: 0; font-family: "Crimson Pro", serif; font-size: 0.4rem; color: var(--text-muted); background: var(--card); border: 1px solid var(--border); border-radius: 5px; padding: 0.1rem 0.2rem; cursor: pointer; }',
    '.armorb-deco.filled .armorb-deco-sel { color: var(--text); border-color: #b8881a66; background: rgba(184,136,26,0.08); }',
    '.armorb-deco-sel:focus { outline: none; border-color: var(--gold-light); }',
    '.armorb-deco-none { font-family: "Crimson Pro", serif; font-size: 0.38rem; color: var(--text-muted); font-style: italic; margin-top: 0.25rem; }',
    '.armorb-slot-empty { font-family: "Crimson Pro", serif; font-size: 0.42rem; color: var(--text-muted); font-style: italic; }',
    '.armorb-x { position: absolute; top: 0.18rem; right: 0.2rem; width: 0.85rem; height: 0.85rem; line-height: 1; font-size: 0.4rem; cursor: pointer; color: var(--text-muted); background: var(--card); border: 1px solid var(--border); border-radius: 50%; padding: 0; display: flex; align-items: center; justify-content: center; }',
    '.armorb-x:hover { color: #d2602e; border-color: #d2602e; }',
    '.armorb-hint, .armorb-none { font-family: "Crimson Pro", serif; font-size: 0.46rem; color: var(--text-muted); }',
    '.armorb-hint { padding: 0 0.7rem 0.7rem; text-wrap: pretty; line-height: 1.4; }',
    '.armorb-totals { display: grid; grid-template-columns: 1fr 1.5fr; gap: 1.1rem; padding: 0 0.7rem 0.6rem; }',
    /* two-column build body: left = equipment inputs, right = sticky results */
    '.armorb-body { display: grid; grid-template-columns: repeat(auto-fit, minmax(13.5rem, 1fr)); gap: 0.85rem; padding: 0.1rem 0.7rem 0.6rem; align-items: start; }',
    '.armorb-col { display: flex; flex-direction: column; gap: 0.5rem; min-width: 0; }',
    '.armorb-col-results { position: sticky; top: 0.4rem; }',
    '.armorb-col-equip .armorb-charm-host { margin: 0; }',
    '.armorb-skillblock { background: linear-gradient(180deg, rgba(184,136,26,0.07), var(--surface) 40%); }',
    /* zoned skill rows with segmented meters */
    '.armorb-skzone-h { display: flex; align-items: center; gap: 0.34rem; margin: 0.4rem 0 0.28rem; font-family: "Cinzel", serif; font-weight: 800; font-size: 0.4rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); }',
    '.armorb-skzone-h::after { content: ""; flex: 1; height: 1px; background: var(--border); }',
    '.armorb-skzone-h.weapon { color: #b07a1e; }',
    '.armorb-skzone-h.armor { color: #2e8b6a; }',
    '.armorb-skzone-h:first-child { margin-top: 0; }',
    '.armorb-skrows { display: flex; flex-direction: column; gap: 0.2rem; }',
    '.armorb-skrow { display: grid; grid-template-columns: minmax(0, 8.5rem) 3.1rem 1fr; align-items: center; gap: 0.4rem; padding: 0.12rem 0.1rem; }',
    '.armorb-skname { font-family: "Crimson Pro", serif; font-size: 0.56rem; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
    '.armorb-skrow.maxed .armorb-skname { color: #1f8a4c; font-weight: 700; }',
    '.armorb-skrow.over .armorb-skname { color: #c0392b; font-weight: 700; }',
    '.armorb-skbar { display: inline-flex; gap: 1.4px; align-items: center; justify-content: flex-start; }',
    '.armorb-skbar.nomax { display: none; }',
    '.armorb-skseg { width: 5px; height: 9px; border-radius: 1.5px; background: rgba(120,110,90,0.22); box-shadow: inset 0 0 0 0.5px rgba(0,0,0,0.08); }',
    '.armorb-skseg.on { background: var(--gold-light); }',
    '.armorb-skrow.maxed .armorb-skseg.on { background: #1f8a4c; }',
    '.armorb-skseg.on.over { background: #c0392b; }',
    '.armorb-skval { font-family: "Cinzel", serif; font-weight: 800; font-size: 0.48rem; color: var(--text-muted); min-width: 1.6rem; text-align: left; }',
    '.armorb-skrow.maxed .armorb-skval { color: #1f8a4c; }',
    '.armorb-skrow.over .armorb-skval { color: #c0392b; }',
    '.armorb-tot-block { border: 1px solid var(--border); border-radius: 9px; padding: 0.45rem 0.5rem; background: var(--surface); }',
    '.armorb-tot-h { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.42rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 0.35rem; }',
    '.armorb-tot-sub { color: var(--gold-light); margin-left: 0.2rem; }',
    '.armorb-pc-trans { flex-shrink: 0; display: inline-flex; align-items: center; gap: 0.2rem; cursor: pointer; font-family: "Cinzel", serif; font-weight: 700; font-size: 0.32rem; letter-spacing: 0.04em; color: var(--text-muted); text-transform: uppercase; user-select: none; padding: 0.1rem 0.28rem; border: 1px solid var(--border); border-radius: 0.5rem; transition: color 0.15s, border-color 0.15s, background 0.15s; }',
    '.armorb-pc-trans input { accent-color: #7a5cc0; width: 0.6rem; height: 0.6rem; cursor: pointer; margin: 0; }',
    '.armorb-pc-trans:hover { color: #7a5cc0; border-color: #7a5cc0; }',
    '.armorb-pc-trans.on { color: #fff; background: #7a5cc0; border-color: #7a5cc0; }',
    '.armorb-skills { display: flex; flex-wrap: wrap; gap: 0.25rem; }',
    '.armorb-skill { display: inline-flex; align-items: center; gap: 0.25rem; font-family: "Crimson Pro", serif; font-size: 0.48rem; color: var(--text); background: var(--card); border: 1px solid var(--border); border-radius: 999px; padding: 0.08rem 0.32rem 0.08rem 0.42rem; }',
    '.armorb-skill-lv { font-family: "Cinzel", serif; font-weight: 800; font-size: 0.42rem; color: #fff; background: var(--gold-light); border-radius: 999px; min-width: 0.78rem; text-align: center; padding: 0 0.12rem; }',
    '.armorb-skill.maxed { color: #fff; background: #1f8a4c; border-color: #1f8a4c; }',
    '.armorb-skill.maxed .armorb-skill-lv { color: #1f8a4c; background: #fff; }',
    '.armorb-skill.over { color: #fff; background: #c0392b; border-color: #c0392b; }',
    '.armorb-skill.over .armorb-skill-lv { color: #c0392b; background: #fff; }',
    /* set-bonus / group-skill chips appended to the Skills summary */
    '.armorb-skill.setbonus, .armorb-skill.groupskill { border-style: dashed; }',
    '.armorb-skill.setbonus { border-color: rgba(212,160,90,0.7); color: var(--gold-light); }',
    '.armorb-skill.setbonus .armorb-skill-lv { background: rgba(212,160,90,0.85); color: #2a1d05; }',
    '.armorb-skill.groupskill { border-color: rgba(120,170,230,0.7); color: #a9cdf0; }',
    '.armorb-skill.groupskill .armorb-skill-lv { background: rgba(120,170,230,0.85); color: #06121f; }',
    '.armorb-skill.setbonus.live, .armorb-skill.groupskill.live { border-style: solid; }',
    '.armorb-skill.setbonus.maxed { color: #fff; background: #b07a1e; border-color: #b07a1e; border-style: solid; }',
    '.armorb-skill.setbonus.maxed .armorb-skill-lv { color: #b07a1e; background: #fff; }',
    '.armorb-skill.groupskill.maxed { color: #fff; background: #2e6da4; border-color: #2e6da4; border-style: solid; }',
    '.armorb-skill.groupskill.maxed .armorb-skill-lv { color: #2e6da4; background: #fff; }',
    '.armorb-slotpills { display: flex; flex-wrap: wrap; gap: 0.3rem; }',
    '.armorb-slotpill { display: inline-flex; align-items: center; gap: 0.24rem; font-family: "Cinzel", serif; font-weight: 800; font-size: 0.5rem; color: var(--text); border: 1px solid var(--border); border-radius: 7px; padding: 0.14rem 0.4rem 0.14rem 0.18rem; background: var(--card); }',
    '.armorb-slotpill-d { display: inline-flex; align-items: center; justify-content: center; width: 0.86rem; height: 0.86rem; border-radius: 50%; font-size: 0.48rem; color: #14110a; background: var(--slotc, #6a6a6a); }',
    '.armorb-slotpill.s1 { --slotc: #5fd05f; } .armorb-slotpill.s2 { --slotc: #57b6f7; } .armorb-slotpill.s3 { --slotc: #f5c828; }',
    '.armorb-bonuses { display: flex; flex-wrap: wrap; gap: 0.45rem; padding: 0 0.7rem 0.7rem; }',
    '.armorb-bonus { flex: 1 1 8rem; border: 1px solid var(--border); border-radius: 9px; padding: 0.4rem 0.5rem; background: var(--surface); opacity: 0.62; }',
    '.armorb-bonus.live { opacity: 1; }',
    '.armorb-bonus.set.live { border-color: #c8a04088; background: rgba(184,136,26,0.1); }',
    '.armorb-bonus.group.live { border-color: #2f9a8c88; background: rgba(47,160,144,0.1); }',
    '.armorb-bonus-h { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.44rem; color: var(--text); margin-bottom: 0.28rem; text-wrap: pretty; line-height: 1.2; }',
    '.armorb-bonus-row { display: flex; align-items: center; gap: 0.35rem; font-family: "Crimson Pro", serif; font-size: 0.46rem; padding: 0.1rem 0; }',
    '.armorb-bonus-row.off { color: var(--text-muted); }',
    '.armorb-bonus-tick { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.46rem; }',
    '.armorb-bonus-row.on .armorb-bonus-tick { color: #4a9a5a; }',
    '.armorb-bonus-skill { flex: 1; min-width: 0; }',
    '.armorb-bonus-req { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.4rem; color: var(--text-muted); }',
    '.armorb-bonus-row.on .armorb-bonus-req { color: var(--gold-light); }',
    '@media (max-width: 360px) { .armor-bonuses { grid-template-columns: 1fr; } .armorb-totals { grid-template-columns: 1fr; } }',
    '.armorb-slot-inds { display: flex; gap: 0.3rem; margin-top: 0.32rem; flex-wrap: wrap; justify-content: center; }',
    '.armorb-slot-ind { display: inline-flex; align-items: center; justify-content: center; width: 0.82rem; height: 0.82rem; font-family: "Cinzel", serif; font-weight: 800; font-size: 0.48rem; line-height: 1; border-radius: 50%; border: 1.5px solid var(--slotc, #8a8a8a); color: var(--slotc, #8a8a8a); background: transparent; opacity: 0.55; transition: all 0.12s; }',
    '.armorb-slot-ind.has-deco { opacity: 1; background: var(--slotc); color: #14110a; box-shadow: 0 0 7px -1px var(--slotc); }',
    '.armorb-slot-ind.s1 { --slotc: #5fd05f; } .armorb-slot-ind.s2 { --slotc: #57b6f7; } .armorb-slot-ind.s3 { --slotc: #f5c828; } .armorb-slot-ind.amu-w { --slotc: #f0913a; }',
    '.armorb-deco-typebadge { margin-left: 0.3rem; font-family: "Cinzel", serif; font-weight: 700; font-size: 0.32rem; color: #7ecfb3; background: rgba(126,207,179,0.15); border: 1px solid rgba(126,207,179,0.4); border-radius: 999px; padding: 0.02rem 0.25rem; letter-spacing: 0.04em; vertical-align: middle; }',
    '.armorb-deco-row { display: flex; align-items: center; gap: 0.28rem; }',
    '.armorb-deco-piece-ic { display: flex; flex-shrink: 0; }',
    '.armorb-deco-piece-ic .armor-pc-ic { font-size: 0.52rem; }',
    '.armorb-deco-piece-ic .armor-pc-ic-img { width: 0.7rem; height: 0.7rem; }',
    '.armorb-deco-piece-ic .armor-pc-ic-mask { width: 0.8rem; height: 0.8rem; }',
    '.armorb-deco-lv { font-family: "Cinzel", serif; font-weight: 900; font-size: 0.56rem; flex-shrink: 0; width: 1.15rem; text-align: center; border-radius: 5px; padding: 0.12rem 0.1rem; }',
    '.armorb-deco-lv.s1 { color: #14110a; background: #5fd05f; border: 1px solid #5fd05f; }',
    '.armorb-deco-lv.s2 { color: #08121e; background: #57b6f7; border: 1px solid #57b6f7; }',
    '.armorb-deco-lv.s3 { color: #14110a; background: #f5c828; border: 1px solid #f5c828; }',
    '.armorb-deco-wrap { flex: 1; min-width: 0; position: relative; }',
    '.armorb-deco-clr { position: absolute; top: 50%; right: 0.2rem; transform: translateY(-50%); width: 0.8rem; height: 0.8rem; display: flex; align-items: center; justify-content: center; line-height: 1; font-size: 0.4rem; cursor: pointer; color: var(--text-muted); background: var(--card); border: 1px solid var(--border); border-radius: 50%; z-index: 4; padding: 0; }',
    '.armorb-deco-clr:hover { color: #d2602e; border-color: #d2602e; background: rgba(210,96,46,0.1); }',
    '.armorb-deco-row.filled .armorb-deco-search { padding-right: 1.15rem; }',
    '.armorb-deco-search { width: 100%; box-sizing: border-box; font-family: "Crimson Pro", serif; font-size: 0.42rem; color: var(--text-muted); background: var(--card); border: 1px solid var(--border); border-radius: 5px; padding: 0.12rem 0.28rem; outline: none; }',
    '.armorb-deco-search:focus { border-color: var(--gold-light); color: var(--text); }',
    '.armorb-deco-row.filled .armorb-deco-search { color: var(--text); border-color: #b8881a66; background: rgba(184,136,26,0.08); }',
    '.armorb-deco-dd { position: fixed; background: var(--card); border: 1px solid var(--gold-light); border-radius: 6px; z-index: 99999; max-height: 14rem; overflow-y: auto; box-shadow: 0 4px 18px rgba(0,0,0,0.35); }',
    '.armorb-deco-dd-item { display: flex; align-items: center; gap: 0.28rem; padding: 0.2rem 0.35rem; cursor: pointer; border-bottom: 1px solid var(--border); }',
    '.armorb-deco-dd-item:last-child { border-bottom: none; }',
    '.armorb-deco-dd-item:hover { background: rgba(184,136,26,0.12); }',
    '.armorb-deco-dd-clear { font-family: "Crimson Pro", serif; font-size: 0.38rem; color: var(--text-muted); font-style: italic; justify-content: center; }',
    '.armorb-deco-dd-slot { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; width: 0.84rem; height: 0.84rem; border-radius: 50%; font-family: "Cinzel", serif; font-weight: 800; font-size: 0.46rem; line-height: 1; color: #14110a; background: var(--slotc, #6a6a6a); }',
    '.armorb-deco-dd-slot.s1 { --slotc: #5fd05f; } .armorb-deco-dd-slot.s2 { --slotc: #57b6f7; } .armorb-deco-dd-slot.s3 { --slotc: #f5c828; }',
    '.armorb-weapon-card { border-left: 2px solid rgba(240,200,64,0.45); }',
    '.armorb-weapon-ic { font-size: 0.6rem !important; line-height: 1; }',
    '.armorb-deco-section-hd { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.35rem; letter-spacing: 0.07em; text-transform: uppercase; padding: 0.18rem 0 0.08rem; border-bottom: 1px solid var(--border); margin-bottom: 0.1rem; }',
    '.armorb-weapon-hd { color: #f0c840; border-color: rgba(240,200,64,0.3); }',
    '.armorb-armor-hd { color: #7ecfb3; border-color: rgba(126,207,179,0.3); }',
    '.armorb-deco-tools { display: flex; justify-content: flex-end; margin-bottom: 0.15rem; }',
    '.armorb-deco-clearall { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.34rem; letter-spacing: 0.04em; color: var(--text-muted); background: transparent; border: 1px solid var(--border); border-radius: 999px; padding: 0.14rem 0.55rem; cursor: pointer; transition: all 0.12s; }',
    '.armorb-deco-clearall:hover:not(:disabled) { color: #e89090; border-color: #e8909066; background: rgba(232,144,144,0.09); }',
    '.armorb-deco-clearall:disabled { opacity: 0.35; cursor: default; }',
    '.armorb-deco-sub { margin-top: 0.32rem; }',
    '.armorb-deco-subhd { display: flex; align-items: center; gap: 0.32rem; padding: 0.2rem 0 0.12rem; border-bottom: 1px solid var(--border); margin-bottom: 0.16rem; font-family: "Cinzel", serif; font-weight: 800; font-size: 0.48rem; letter-spacing: 0.04em; text-transform: uppercase; color: #1b1b1b; }',
    '.armorb-deco-subhd.is-weapon { border-color: rgba(200,150,20,0.5); }',
    '.armorb-deco-subhd.is-armor { border-color: rgba(60,150,110,0.5); }',
    '.armorb-deco-subic { display: flex; flex-shrink: 0; }',
    '.armorb-deco-subic .armor-pc-ic { font-size: 0.5rem; } .armorb-deco-subic .armor-pc-ic-img { width: 0.72rem; height: 0.72rem; } .armorb-deco-subic .armor-pc-ic-mask { width: 0.82rem; height: 0.82rem; }',
    '.armorb-deco-sublabel { flex: 1; display: flex; flex-direction: column; line-height: 1.15; min-width: 0; }',
    '.armorb-deco-kind { font-family: "Cinzel", serif; font-weight: 800; font-size: 0.4rem; letter-spacing: 0.05em; text-transform: uppercase; color: var(--text-muted); }',
    '.armorb-deco-setname { font-family: "Crimson Pro", serif; font-weight: 600; font-size: 0.54rem; color: #1b1b1b; text-transform: none; letter-spacing: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
    '.armorb-deco-noslot { font-family: "Cinzel", serif; font-size: 0.36rem; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-muted); opacity: 0.7; flex-shrink: 0; }',
    '.armorb-deco-unequip { flex-shrink: 0; width: 1rem; height: 1rem; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; line-height: 1; color: var(--text-muted); background: transparent; border: 1px solid var(--border); border-radius: 4px; cursor: pointer; padding: 0; transition: all 0.12s; }',
    '.armorb-deco-unequip:hover { color: #fff; background: #c0392b; border-color: #c0392b; }',
    '.armorb-deco-clearpiece { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.3rem; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-muted); background: transparent; border: 1px solid var(--border); border-radius: 999px; padding: 0.06rem 0.42rem; cursor: pointer; transition: all 0.12s; }',
    '.armorb-deco-clearpiece:hover:not(:disabled) { color: #e89090; border-color: #e8909066; }',
    '.armorb-deco-clearpiece:disabled { opacity: 0.3; cursor: default; }',
    '.armorb-deco-dd-name { flex: 1; min-width: 0; font-family: "Crimson Pro", serif; font-size: 0.42rem; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
    '.armorb-deco-dd-skill { font-family: "Cinzel", serif; font-weight: 700; font-size: 0.34rem; color: var(--gold-light); background: rgba(184,136,26,0.12); border: 1px solid #b8881a44; border-radius: 999px; padding: 0.02rem 0.22rem; flex-shrink: 0; white-space: nowrap; }'
  ].join('\n');
  document.head.appendChild(css);
}
