function init(hero) {
    hero.setName("Mister Fantastic/Reed Richards");
    hero.setTier(5);
    
    hero.setHelmet("Hair");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Leggings");
    hero.setBoots("Boots");
	
    hero.addPowers("tgheroes:fatastic_pow");
    hero.addAttribute("PUNCH_DAMAGE", 3.0, 0);
    hero.addAttribute("WEAPON_DAMAGE", 1.5, 0);
    hero.addAttribute("JUMP_HEIGHT", 4.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    hero.addAttribute("SPRINT_SPEED", 0.05, 1);
    
    hero.addKeyBind("TENTACLE_JAB", "Hand Jab", 1);
    hero.addKeyBind("TENTACLE_GRAB", "Hand Grab", 2);
    hero.addKeyBind("TENTACLE_STRIKE", "Hand Strike", 3);
    hero.addKeyBind("TENTACLES", "Arms Outstretched", 5);
	hero.addKeyBind("BLADE", "Hand Hammer", 4);
	hero.addKeyBind("BALL", "Ball Form", 2);
	
	hero.addKeyBind("AIM", "Aim", 1);
	hero.addKeyBind("ENERGY_PROJECTION", "", -1);
	
	
	hero.supplyFunction("canAim", canAim);
    hero.setKeyBindEnabled(isKeyBindEnabled);
	hero.setModifierEnabled(isModifierEnabled);
	hero.addAttributeProfile("BLADE", handProfile);
    hero.setAttributeProfile(getProfile);
    hero.setDamageProfile(getProfile);
    hero.addDamageProfile("BLADE", {"types": {"BLUNT": 1.5}});	
	
	hero.addDamageProfile("BALL", {
        "types": {
            "BLUNT": 1.0
        },
        "properties": {
             "ADD_KNOCKBACK": 2.0
        }
    });
	
	
	 hero.setTickHandler((entity, manager) => {
		 
		 if (entity.getData("tgheroes:dyn/ball_timer") > 0 && entity.getData("tgheroes:dyn/ball") && entity.getData("tgheroes:dyn/ball_timer") < 1) {
            var list = entity.world().getEntitiesInRangeOf(entity.eyePos(), 2.0);
            list.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "BALL", "%s Crushed by Mr. Fantastic", 2.0, entity);

                }
            });

        }
		
		if (entity.getData("tgheroes:dyn/ball_timer") > 0) {
            var list2 = entity.world().getEntitiesInRangeOf(entity.eyePos(), 2.0);
            list2.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "BLADE", "%s Crushed by Mr. Fantastic", 2.0, entity);

                }
            });

        }
		 
		 if (entity.getData("tgheroes:dyn/ball") && !entity.isOnGround()) {
            manager.setData(entity, "fiskheroes:flying", true);
        }
		
		if (entity.getData("fiskheroes:gliding")) {
            manager.setData(entity, "tgheroes:dyn/parash", true);
        } else if (!entity.getData("fiskheroes:gliding")) {
            manager.setData(entity, "tgheroes:dyn/parash", false);
        }
		 
		 
		 
        manager.incrementData(entity, "tgheroes:dyn/move_timer2", 1, 1, entity.getData("fiskheroes:moving"));
        manager.incrementData(entity, "tgheroes:dyn/jump_timer", 1, 5, entity.motionY() > 0.8 );
		
		


        var move_timer = entity.getData("tgheroes:dyn/move_timer")
        if (entity.getData("tgheroes:dyn/move_timer2") == 1) {
            manager.setData(entity, "tgheroes:dyn/move_timer", move_timer + 0.02);
            manager.setData(entity, "tgheroes:dyn/move_timer2", 0);

        }
		
		/*
		if (entity.getData("tgheroes:dyn/jump_timer") == 1){
            manager.setData(entity, "tgheroes:dyn/jump_timer", 0);	
		}
        */
        if (!entity.getData("tgheroes:dyn/ball")) {
            manager.setData(entity, "tgheroes:dyn/move_timer", 0);
        }
		
        


		if (entity.getData("tgheroes:dyn/aim_int") != 0 && entity.getData("tgheroes:dyn/aim_int") != 1) {
            manager.setData(entity, "tgheroes:dyn/aim_int", 0);

        }
		
        manager.incrementData(entity, "tgheroes:dyn/mf_rarm", 2, 5, entity.getData("fiskheroes:energy_projection") && entity.getData("tgheroes:dyn/aim_int") == 0)
        manager.incrementData(entity, "tgheroes:dyn/mf_larm", 2, 5, entity.getData("fiskheroes:energy_projection") && entity.getData("tgheroes:dyn/aim_int") == 1)

		if (entity.getData("tgheroes:dyn/aim_int") == 0 && entity.getData("tgheroes:dyn/mf_rarm") > 0.5 && entity.getData("tgheroes:dyn/mf_larm") < 0.2) {
            manager.setData(entity, "tgheroes:dyn/aim_int", 1);
        }else if (entity.getData("tgheroes:dyn/aim_int") == 1 && entity.getData("tgheroes:dyn/mf_larm") > 0.5 && entity.getData("tgheroes:dyn/mf_rarm") < 0.2) {
            manager.setData(entity, "tgheroes:dyn/aim_int", 0);
        }
		
		
    });
	
	
}

function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}

function handProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 6, 0);
}

function getProfile(entity) {
    return entity.getData("fiskheroes:blade") ? "BLADE" : null;
}

function isKeyBindEnabled(entity, keyBind) {
	switch (keyBind) {
        case "TENTACLE_JAB":
            return !entity.getData("fiskheroes:tentacles") == 0;
        case "TENTACLES":
            return !entity.getData("tgheroes:dyn/parash") && !entity.getData("tgheroes:dyn/ball") && !entity.getData("fiskheroes:gliding") && !entity.getData("fiskheroes:blade");
        case "TENTACLE_STRIKE":
            return !entity.getData("fiskheroes:tentacles") == 0;
		case "TENTACLE_GRAB":
            return !entity.getData("fiskheroes:tentacles") == 0;
		case "BLADE":
            return !entity.getData("fiskheroes:tentacles") == 1 && !entity.getData("tgheroes:dyn/parash") && !entity.getData("tgheroes:dyn/ball") && !entity.getData("fiskheroes:gliding");
		case "BALL":
            return !entity.getData("fiskheroes:tentacles") == 1 && !entity.getData("fiskheroes:blade") && !entity.getData("tgheroes:dyn/parash") && !entity.getData("fiskheroes:gliding");
		case "AIM":
            return !entity.getData("fiskheroes:tentacles") == 1 && !entity.getData("fiskheroes:blade") && !entity.getData("tgheroes:dyn/parash") && !entity.getData("tgheroes:dyn/ball") && !entity.getData("fiskheroes:gliding");
        case "ENERGY_PROJECTION":
            return entity.getData("fiskheroes:aiming");
        default:
            return true;
    }
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
	case "fiskheroes:controlled_flight":
        return entity.world().getBlock(entity.pos().add(0, 0.1, 0)) == 'minecraft:water' && entity.world().getBlock(entity.pos().add(0, 1, 0)) == 'minecraft:air' && entity.getData("tgheroes:dyn/ball")
        || entity.world().getBlock(entity.pos().add(0, -0.1, 0)) == 'minecraft:water' && entity.world().getBlock(entity.pos().add(0, 1, 0)) == 'minecraft:air' && entity.getData("tgheroes:dyn/ball");	
    case "fiskheroes:blade":
        return !entity.getData("fiskheroes:tentacles") == 1;
    case "fiskheroes:gliding":
        return !entity.getData("fiskheroes:tentacles") == 1 && !entity.getData("fiskheroes:blade") && !entity.getData("tgheroes:dyn/ball");
    default:
        return true;
    }
}