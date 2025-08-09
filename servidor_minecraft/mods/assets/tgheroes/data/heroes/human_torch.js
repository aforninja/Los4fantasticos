	function init(hero) {
    hero.setName("Human Torch");
    hero.setVersion("Johnny Storm");
    hero.setTier(3);

    hero.setHelmet("Head");
    hero.setChestplate("Chestpiece");
    hero.setLeggings("Pants");
    hero.setBoots("Shoes");

    hero.addPowers("tgheroes:human_torch_pow");
    hero.addAttribute("FALL_RESISTANCE", 6.0, 0);
    hero.addAttribute("IMPACT_DAMAGE", 0.3, 1);
    hero.addAttribute("PUNCH_DAMAGE", 4.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.05, 1);

    hero.addKeyBind("ENERGY_PROJECTION", "Fire Beam", 2);
    hero.addKeyBind("FLAME_ON", "Flame On", 5);
	

    hero.addKeyBindFunc("FIRE_AOE", (player, manager) => {
        if (!player.getData("tgheroes:dyn/fire") && player.getData("tgheroes:dyn/fire_timer") == 0) {
            manager.setData(player, "tgheroes:dyn/fire", true);
            manager.setData(player, "tgheroes:dyn/fire_timer_sound", 0.1);
			
        }
        return true;
    }, "Nova's Collapse", 3);

    hero.addDamageProfile("FLAME", {
        "types": {
            "COSMIC": 1.0,
            "FIRE": 1.0
        },
        "properties": {
            "COOK_ENTITY": true,
            "IGNITE": 5,
            "HEAT_TRANSFER": 30
        }
    });


	
	hero.addAttributeProfile("THROW", throwProfile);
	hero.setAttributeProfile(getProfile);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.supplyFunction("canAim", canAim);
    hero.setTickHandler((entity, manager) => {
        var flying = entity.getData("fiskheroes:flying");
		
        manager.incrementData(entity, "tgheroes:dyn/flame_animation_timer", 10, 10, entity.getData("tgheroes:dyn/flame"));
		
        manager.incrementData(entity, "fiskheroes:dyn/booster_timer", 2, flying);

	
        if (entity.isInWater() ) {
            manager.setData(entity, "tgheroes:dyn/flame", false);
        }
		
		if (entity.getData("fiskheroes:flying")) {
            manager.setData(entity, "tgheroes:dyn/flame", true);
        }
	

//SOUND_START	    
        
		
		if (entity.getData("tgheroes:dyn/fire_timer") > 0.2) {
        manager.setData(entity, "tgheroes:dyn/fire_timer_sound", 0);
        }
		
        if (entity.getData("tgheroes:dyn/fire_timer_sound") > 0.1 && !entity.getData("tgheroes:dyn/fire_timer_sound") == 0 )  {
			entity.playSound("tgheroes:nova_blast_torch", 1, 1.15 - Math.random() * 0.3);
		}
		
//SOUND_FINISH	
		
		
		manager.incrementData(entity, "tgheroes:dyn/fire_timer", 50, 1000, entity.getData("tgheroes:dyn/fire"));
		
        if (entity.getData("tgheroes:dyn/fire_timer") > 0.8 && entity.getData("tgheroes:dyn/fire")) {
            var list = entity.world().getEntitiesInRangeOf(entity.eyePos(), 6.0);
            list.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "FLAME", "%s Burned by Human Torch Nova Collapse", 25.0, entity);

                }
            });
            if (entity.getData("tgheroes:dyn/fire_timer") == 1) {
                manager.setData(entity, "tgheroes:dyn/fire", false);
            }

        }
    });

}

function getProfile(entity) {
	if (entity.getData("tgheroes:dyn/fire")) {
        return "THROW";
    }
	return false;
}

function throwProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("BASE_SPEED", -2.0, 0);
	profile.addAttribute("JUMP_HEIGHT", -5.0, 0);
	profile.addAttribute("PUNCH_DAMAGE", -2.0, 0);
}

function isKeyBindEnabled(entity, keyBind) {
    if (entity.getInterpolatedData("tgheroes:dyn/flame_timer") == 1 && entity.isSprinting() && entity.getData("fiskheroes:flying") && !entity.isInWater()) {
        return false;
    }
    switch (keyBind) {
        case "ENERGY_PROJECTION":
            return entity.getHeldItem().isEmpty() && entity.getInterpolatedData("tgheroes:dyn/flame_timer") == 1 && !entity.isInWater() && !entity.getData("fiskheroes:aiming") && !entity.getInterpolatedData("tgheroes:dyn/fire");
        case "FIRE_AOE":
            return entity.getHeldItem().isEmpty() && entity.getInterpolatedData("tgheroes:dyn/flame_timer") == 1 && !entity.isInWater()
			&& !entity.getData("fiskheroes:aiming") && !entity.getData("fiskheroes:energy_projection") && entity.isOnGround() && !entity.getInterpolatedData("tgheroes:dyn/fire");
		case "FLAME_ON":
			return !entity.isInWater() && !entity.getInterpolatedData("tgheroes:dyn/fire");	
        default:
            return true;
    }
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.id()) {
        case "fiskheroes:fireball":
            return !entity.isInWater();
        case "fiskheroes:controlled_flight":
            return !entity.isInWater();
        case "fiskheroes:fire_immunity":
            return (!entity.isInWater());
        case "fiskheroes:energy_projection":
            return (entity.getInterpolatedData("tgheroes:dyn/flame_timer") == 1 && !entity.isInWater());
        case "fiskheroes:damage_weakness":
            return entity.getInterpolatedData("tgheroes:dyn/flame_timer") == 1;
        default:
            return true;
    }
}

function canAim(entity) {
    return entity.getHeldItem().isEmpty() && entity.getInterpolatedData("tgheroes:dyn/flame_timer") == 1 && !entity.isInWater();
}


