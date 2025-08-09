function init(hero) {
    hero.setName("Beast/Henry McCoy");
    hero.setTier(7);
    
    hero.setHelmet("Head");
    hero.setChestplate("Torso");
    hero.setLeggings("Leggings");
    hero.setBoots("Feet");
    
    hero.addPowers("tgheroes:xmen_beast");
    hero.addAttribute("PUNCH_DAMAGE", 6.0, 0);
    hero.addAttribute("JUMP_HEIGHT", 2.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 9.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.15, 1);
	
	hero.addKeyBind("WALL", "Togle Wall Climb", 4);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setDefaultScale(1.25);
	hero.setModifierEnabled(isModifierEnabled);	
	hero.addAttributeProfile("BLADE", bladeProfile);
    hero.setAttributeProfile(getProfile);
    hero.setDamageProfile(getProfile);
    hero.addDamageProfile("BLADE", {
        "types": {
            "SHARP": 1.0
        }
    });
	hero.setTickHandler((entity, manager) => {
        if (!entity.isSneaking() && !entity.isOnGround()) {
            manager.setData(entity, "fiskheroes:flying", true);
        }
		if (!entity.getHeldItem().isEmpty()) {
            manager.setData(entity, "tgheroes:dyn/wall_climb", false);
        }
    });
}

function isKeyBindEnabled(entity, keyBind) {  
	switch (keyBind) {
    case "WALL":
        return entity.getHeldItem().isEmpty();
    default:
        return true;
    }
}

function bladeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 10.0, 0);
}

function getProfile(entity) {
    return entity.getHeldItem().isEmpty() ? "BLADE" : null;
}

function isModifierEnabled(entity, modifier) {
	switch (modifier.name()) {
	case "fiskheroes:controlled_flight":
        return entity.getHeldItem().isEmpty() && entity.getData("tgheroes:dyn/wall_climb")
        && entity.world().getBlock(entity.pos().add(0, 0, 1)) != 'minecraft:air' && !entity.isInWater()
        || entity.getHeldItem().isEmpty() && entity.getData("tgheroes:dyn/wall_climb")
        && entity.world().getBlock(entity.pos().add(0, 0, -1)) != 'minecraft:air' && !entity.isInWater()
        ||  entity.getHeldItem().isEmpty() && entity.getData("tgheroes:dyn/wall_climb")
        && entity.world().getBlock(entity.pos().add(1, 0, 0)) != 'minecraft:air' && !entity.isInWater()
        || entity.getHeldItem().isEmpty() && entity.getData("tgheroes:dyn/wall_climb")
        && entity.world().getBlock(entity.pos().add(-1, 0, 0)) != 'minecraft:air'&& !entity.isInWater();
	default:
        return true;
    }
} 