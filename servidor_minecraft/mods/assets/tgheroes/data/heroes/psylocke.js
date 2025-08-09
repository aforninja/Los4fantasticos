function init(hero) {
    hero.setName("Psylocke/Elizabeth Braddock");
    hero.setTier(3);
    
    hero.setHelmet("Hair");
    hero.setChestplate("Bodysuit");
    hero.setBoots("Boots");
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:tgheroes:psy_katana}", true, item => item.nbt().getString("WeaponType") == 'tgheroes:psy_katana');

    hero.addPowers("tgheroes:xmen_psylocke");
    hero.addAttribute("PUNCH_DAMAGE", 6.0, 0);
    hero.addAttribute("WEAPON_DAMAGE", 6.0, 0);
    hero.addAttribute("JUMP_HEIGHT", 3.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 7.0, 0);
	hero.addAttribute("SPRINT_SPEED", 0.2, 1);
	hero.addAttribute("STEP_HEIGHT", 0.5, 0);
	
	hero.addKeyBind("AIM", "Aim", 4);
	hero.addKeyBind("INVIS", "Invisibility", 2);
    
	hero.addKeyBind("DASH", "Psi-blade Dash", 1);

    hero.addKeyBindFunc("PSY_MELEE", (player, manager) => {
        if (!player.getData("tgheroes:dyn/psy") && player.getData("tgheroes:dyn/psy_timer") == 0) {
            manager.setData(player, "tgheroes:dyn/psy", true);
			
        }
        return true;
    }, "DANCE OF THE BUTTERFLY", 5);

	hero.supplyFunction("canAim", canAim);
	hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setAttributeProfile(getProfile);
    hero.addAttributeProfile("THROW", throwProfile);
    hero.addAttributeProfile("DODGE", dodgeProfile);

    hero.addDamageProfile("ULTIMATE", {
        "types": {
            "SHARP": 1.0
        }
    });
    

	hero.setKeyBindEnabled(isKeyBindEnabled); 
    hero.setTickHandler((entity, manager) => {
        
        
        if  (entity.isSprinting() && entity.motionY() > 0.5 && !entity.isOnGround() && entity.getData("tgheroes:dyn/jump_timer") == 0) {
            manager.setDataWithNotify(entity, "tgheroes:dyn/jump", true);
        }
        else if (entity.isOnGround() || entity.isInWater()|| entity.getData("tgheroes:dyn/jump_land")) {
            manager.setDataWithNotify(entity, "tgheroes:dyn/jump", false);
        }

        if  (entity.motionX() == 12 && entity.getData("tgheroes:dyn/jump_timer") > 0.7) {
            manager.setDataWithNotify(entity, "tgheroes:dyn/jump_land", true);
        }
		else if  (entity.isOnGround() || entity.isInWater()  && entity.getData("tgheroes:dyn/jump_timer") < 0.7) {
            manager.setDataWithNotify(entity, "tgheroes:dyn/jump_land", false);
        }

        manager.incrementData(entity, "tgheroes:dyn/jump_timer", 10, entity.getData("tgheroes:dyn/jump"));
		
			
		manager.incrementData(entity, "tgheroes:dyn/stand", 1, 1, entity.is("DISPLAY") && !entity.as("DISPLAY").isStatic());
			
			if (entity.getData("tgheroes:dyn/invis_timer") == 1) {
            manager.setDataWithNotify(entity, "fiskheroes:invisible", true);
             }

             if (entity.getData("tgheroes:dyn/invis_timer") < 0.9) {
            manager.setDataWithNotify(entity, "fiskheroes:invisible", false);
             }
		
		/*	
			//SOUND_START	    
        
		
		if (entity.getData("tgheroes:dyn/psy_timer") > 0.2) {
        manager.setData(entity, "tgheroes:dyn/psy_timer_sound", 0);
        }
		
        if (entity.getData("tgheroes:dyn/psy_timer_sound") > 0.1 && !entity.getData("tgheroes:dyn/psy_timer_sound") == 0 )  {
			entity.playSound("tgheroes:psy_dancing", 1, 1.15 - Math.random() * 0.3);
		}
		
	//SOUND_FINISH
		*/
        manager.incrementData(entity, "tgheroes:dyn/psy_timer", 110, 1000, entity.getData("tgheroes:dyn/psy"));
		
        if (entity.getData("tgheroes:dyn/psy_timer") > 0 && entity.getData("tgheroes:dyn/psy")) {
            var list = entity.world().getEntitiesInRangeOf(entity.eyePos(), 8.0);
            list.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "ULTIMATE", "%s was killed by a Butterfly Dance performed by Psylocke.", 10.0, entity);

                }
            });
            if (entity.getData("tgheroes:dyn/psy_timer") == 1 || !entity.getHeldItem().name() == "fisktag:weapon" && (!entity.getHeldItem().nbt().getString('WeaponType') == 'tgheroes:psy_katana')) {
                manager.setData(entity, "tgheroes:dyn/psy", false);
            }

        }

		
        if (entity.getData("tgheroes:dyn/dodge_timer") > 0 && entity.getData("tgheroes:dyn/dodge")) {
            var list = entity.world().getEntitiesInRangeOf(entity.eyePos(), 4.0);
            list.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "ULTIMATE", "%s was killed by Psi-blade Dash by Psylocke.", 10.0, entity);

                }
            });

        }


	});
}

function getProfile(entity) {
	if (entity.getData("tgheroes:dyn/psy")) {
        return "THROW";
    }
    if (entity.getData("tgheroes:dyn/dodge")) {
        return "DODGE";
    }
	return false;
}

function throwProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("BASE_SPEED", -2.0, 0);
	profile.addAttribute("JUMP_HEIGHT", -2.0, 0);
	profile.addAttribute("PUNCH_DAMAGE", -2.0, 0);
}

function dodgeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("BASE_SPEED", 1.05, 0);
}


function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "PSY_MELEE":
            return (entity.getHeldItem().name() == "fisktag:weapon" && (entity.getHeldItem().nbt().getString('WeaponType') == 'tgheroes:psy_katana') && entity.isOnGround() && !entity.getData("tgheroes:dyn/psy"));
        case "DASH":
            return (entity.getHeldItem().name() == "fisktag:weapon" && (entity.getHeldItem().nbt().getString('WeaponType') == 'tgheroes:psy_katana') 
            && !entity.getData("tgheroes:dyn/psy") && entity.isOnGround() && entity.isSprinting());
        case "AIM":
            return (!entity.getData("tgheroes:dyn/psy"));
        case "INVIS":
            return (!entity.getData("tgheroes:dyn/psy"));
	default:
		return true;
	}
}



