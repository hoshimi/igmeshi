let effects_descriptions = {
    "none": {
        "ja": {"title": "なし", "desc": "なし", "amount": 0, "nolv": true},
        "en": {"title": "none", "desc": "no bonus", "amount": 0, "nolv": true}
    },
    "ATKUP": {
        "ja": {"title": "攻撃力アップ", "desc": "攻撃力が +@@される", "amount": 10, "nolv": false},
        "en": {"title": "Attack Boost", "desc": "Increases attack by +@@.", "amount": 10, "nolv": false}
    },
    "DEFUP": {
        "ja": {"title": "防御力アップ", "desc": "防御力が +@@される", "amount": 10, "nolv": false},
        "en": {"title": "Defense Boost", "desc": "Increases defense by +@@.", "amount": 10, "nolv": false}
    },
    "HPUP": {
        "ja": {"title": "HPアップ", "desc": "最大HPが +@@される", "amount": 50, "nolv": false},
        "en": {"title": "HP Boost", "desc": "Increases maximum HP by +@@.", "amount": 50, "nolv": false},
    },
    "HPCUREUP": {
        "ja": {"title": "HP回復速度アップ", "desc": "HP回復速度が +@@%される", "amount": 25, "nolv": false},
        "en": {"title": "Ragen Boost", "desc": "Accelerates HP recovery rate by +@@%.", "amount": 25, "nolv": false},
    },
    "INTUP": {
        "ja": {"title": "魔力アップ", "desc": "魔力が +@@される", "amount": 10, "nolv": false},
        "en": {"title": "Magic Boost", "desc": "Increases magic by +@@.", "amount": 10, "nolv": false},
    },
    "MNDUP": {
        "ja": {"title": "精神アップ", "desc": "精神が +@@される", "amount": 10, "nolv": false},
        "en": {"title": "Spirit Boost", "desc": "Increases spirit by +@@.", "amount": 10, "nolv": false},
    },
    "POISSON_GUARD": {
        "ja": {"title": "毒無効", "desc": "毒を完全に防ぐ", "amount": 0, "nolv": true},
        "en": {"title": "Poisonproof", "desc": "Prevents poison.", "amount": 0, "nolv": true},
    },
    "TODO_GUARD": {
        "ja": {"title": "トード無効", "desc": "トードを完全に防ぐ", "amount": 0, "nolv": true},
        "en": {"title": "Toadproof", "desc": "Prevents toad.", "amount": 0, "nolv": true},
    },
    "DEATH_GUARD": {
        "ja": {"title": "即死無効", "desc": "即死を完全に防ぐ", "amount": 0, "nolv": true},
        "en": {"title": "Deathproof", "desc": "Prevents death.", "amount": 0, "nolv": true},
    },
    "STATUS_GUARD": {
        "ja": {"title": "状態異常耐性", "desc": "状態異常をほぼ完全に防ぐ", "amount": 0, "nolv": true},
        "en": {"title": "Proof", "desc": "Prevents status", "amount": 0, "nolv": true},
    },
    "FIRE_GUARD": {
        "ja": {"title": "炎耐性アップ", "desc": "炎耐性が +@@される", "amount": 10, "nolv": false},
        "en": {"title": "Flameproof", "desc": "Increases fire resistance by +@@.", "amount": 10, "nolv": false},
    },
    "ICE_GUARD": {
        "ja": {"title": "冷気耐性アップ", "desc": "冷気耐性が +@@される", "amount": 10, "nolv": false},
        "en": {"title": "Iceproof", "desc": "Increases ice resistance by +@@.", "amount": 10, "nolv": false},
    },
    "THUNDER_GUARD": {
        "ja": {"title": "雷耐性アップ", "desc": "雷耐性が +@@される", "amount": 10, "nolv": false},
        "en": {"title": "Thunderproof", "desc": "Increases thunder resistance by +@@.", "amount": 10, "nolv": false},
    },
    "ELEMENT_GUARD": {
        "ja": {"title": "属性ガード", "desc": "炎・冷気・雷の属性攻撃を防ぐ", "amount": 0, "nolv": true},
        "en": {"title": "Elementproof", "desc": "Increases elemental resistance.", "amount": 0, "nolv": true},
    },
    "GOODNESS": {
        "ja": {"title": "好調", "desc": "全体的にパラメータがアップし、獲得経験値も +10%される", "amount": 0, "nolv": true},
        "en": {"title": "Goodness", "desc": "Increases parameters and experience earned by 10%", "amount": 0, "nolv": true},
    },
    "LVBONUS": {
        "ja": {"title": "レベル差ボーナス", "desc": "敵とのレベル差があるほど与えるダメージがアップする", "amount": 0, "nolv": true},
        "en": {"title": "Equalizer", "desc": "Increases damage dealt based on the level difference between the party and enemies.", "amount": 0, "nolv": true},
    },
    "EXPBONUS": {
        "ja": {"title": "獲得経験値アップ", "desc": "獲得経験値が +@@%される", "amount": 10, "nolv": false},
        "en": {"title": "EXP Boost", "desc": "Increases experience points earned by +@@%.", "amount": 10, "nolv": false},
    },
    "LUCKUP": {
        "ja": {"title": "発見力アップ", "desc": "敵を倒したときにアイテムを拾う確率が +@@%アップする", "amount": 10, "nolv": false},
        "en": {"title": "Perception Boost", "desc": "Increases enemy item drop rate by +@@%.", "amount": 10, "nolv": false},
    },
    "INF_STAMINA": {
        "ja": {"title": "スタミナ∞", "desc": "ダッシュしてもスタミナが減らなくなる", "amount": 0, "nolv": true},
        "en": {"title": "Endurance", "desc": "Enables sprinting without expending stamina.", "amount": 0, "nolv": true},
    },
}

export default effects_descriptions;
