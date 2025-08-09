function init(hero) {
    hero.setName("Sabretooth/Victor Creed");
    hero.setTier(4);
    
    hero.setHelmet("Mask");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Leggings");
    hero.setBoots("Boots");
    
    hero.addPowers("tgheroes:xmen_sabretooth");
    hero.addAttribute("PUNCH_DAMAGE", 4.5, 0);
    hero.addAttribute("STEP_HEIGHT", 0.5, 0);
    hero.addAttribute("JUMP_HEIGHT", 2.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 5.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.15, 1);
    
    hero.addKeyBind("BLADE", "Claws", 1);
	hero.addKeyBind("SLOW_MOTION", "Heightened Perception", 2);
	hero.addKeyBind("WALL", "Togle Wall Climb", 5);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.addAttributeProfile("CLAWS", clawsProfile);
    hero.setAttributeProfile(getProfile);
	hero.setModifierEnabled(isModifierEnabled);
    hero.setDamageProfile(getProfile);
    hero.addDamageProfile("CLAWS", {"types": {"SHARP": 1.0}});
	hero.setTickHandler((entity, manager) => {
        if (!entity.isSneaking() && !entity.isOnGround()) {
            manager.setData(entity, "fiskheroes:flying", true);
        }
		if (!entity.getData("fiskheroes:blade")) {
            manager.setData(entity, "tgheroes:dyn/wall_climb", false);
        }
    });
}

function isKeyBindEnabled(entity, keyBind) {  
	switch (keyBind) {
    case "WALL":
        return entity.getData("fiskheroes:blade");
    default:
        return true;
    }
}

function clawsProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 9.0, 0);
}

function getProfile(entity) {
    return entity.getData("fiskheroes:blade") ? "CLAWS" : null;
}

function isModifierEnabled(entity, modifier) {
	switch (modifier.name()) {
	case "fiskheroes:controlled_flight":
        return entity.getData("fiskheroes:blade") && entity.getData("tgheroes:dyn/wall_climb")
        && entity.world().getBlock(entity.pos().add(0, 0, 1)) != 'minecraft:air' && !entity.isInWater()
        || entity.getData("fiskheroes:blade") && entity.getData("tgheroes:dyn/wall_climb")
        && entity.world().getBlock(entity.pos().add(0, 0, -1)) != 'minecraft:air' && !entity.isInWater()
        ||  entity.getData("fiskheroes:blade") && entity.getData("tgheroes:dyn/wall_climb")
        && entity.world().getBlock(entity.pos().add(1, 0, 0)) != 'minecraft:air' && !entity.isInWater()
        || entity.getData("fiskheroes:blade") && entity.getData("tgheroes:dyn/wall_climb")
        && entity.world().getBlock(entity.pos().add(-1, 0, 0)) != 'minecraft:air' && !entity.isInWater();
	case "fiskheroes:wall_crawling":
        return entity.getData("fiskheroes:blade");
	default:
        return true;
    }
}
