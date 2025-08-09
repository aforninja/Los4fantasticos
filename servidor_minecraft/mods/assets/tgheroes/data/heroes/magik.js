function init(hero) {
    hero.setName("Magik/Illyana Rasputina");
    hero.setTier(3);

    hero.setHelmet("Hair");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Leggings");
    hero.setBoots("Boots");
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:tgheroes:soulsword}", true, item => item.nbt().getString("WeaponType") == 'tgheroes:soulsword');

    hero.addPowers("tgheroes:xmen_magik");
    hero.addAttribute("PUNCH_DAMAGE", 5.0, 0);
    hero.addAttribute("WEAPON_DAMAGE", 6.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 4.0, 0);
	hero.addAttribute("JUMP_HEIGHT", 2.0, 0);
	hero.addAttribute("SPRINT_SPEED", 0.15, 1);
	
	hero.addKeyBind("CHARGE_ENERGY", "Soul Dissection", 2);

	hero.addKeyBind("DARKCHILD", "Release Darkchylde", 3);

	hero.addKeyBind("RUN", "Limbo Dash", 4);

	hero.addKeyBind("CHARGED_BEAM", "Limbo Flare", 1);
    

    hero.addAttributeProfile("BLADE", bladeProfile);
    hero.addAttributeProfile("DARKCHILD", darkchildProfile);
    hero.setAttributeProfile(getProfile);
    hero.setDamageProfile(getProfile);
    hero.addDamageProfile("BLADE", {
        "types": {
            "SHARP": 1.0,
            "MAGIC": 1.0
        }
    });
    hero.setTierOverride(getTierOverride);
	hero.supplyFunction("canAim", canAim);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setModifierEnabled(isModifierEnabled);
	hero.setTickHandler((entity, manager) => {
        
   
        if (entity.getData("tgheroes:dyn/dodge_timer") > 0 && entity.getData("tgheroes:dyn/dodge")) {
            var list = entity.world().getEntitiesInRangeOf(entity.eyePos(), 4.0);
            list.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "BLADE", "%s was killed by Limbo Dash by Magik.", 10.0, entity);

                }
            });

        }


	});

}


function bladeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("BASE_SPEED", 1.5, 0);
}

function darkchildProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 7.0, 0);
    profile.addAttribute("WEAPON_DAMAGE", 8.0, 0);
    profile.addAttribute("FALL_RESISTANCE", 8.0, 0);
	profile.addAttribute("JUMP_HEIGHT", 4.0, 0);
	profile.addAttribute("SPRINT_SPEED", 0.2, 1);
}

function getProfile(entity) {
	if (entity.getData("tgheroes:dyn/dodge")) {
        return "BLADE";
    }
    if (entity.getData("tgheroes:dyn/darkchild")) {
        return "DARKCHILD";
    }
	return false;
}

function getTierOverride(entity) {
    return (entity.getData("tgheroes:dyn/darkchild")) ? 7 : 3;
}

function isKeyBindEnabled(entity, keyBind) {  
	switch (keyBind) {
	case "CHARGE_ENERGY":
        return entity.getHeldItem().name() == "fisktag:weapon" && (entity.getHeldItem().nbt().getString('WeaponType') == 'tgheroes:soulsword') 
        && ((entity.getHeldItem().name() == "fisktag:weapon" && entity.getHeldItem().isWeapon()) && !entity.as("PLAYER").isUsingItem());
    case "DARKCHILD":
        return (!entity.as("PLAYER").isUsingItem());
    case "CHARGED_BEAM":
        return (!entity.as("PLAYER").isUsingItem()); 
    case "RUN":
        return entity.getHeldItem().name() == "fisktag:weapon" && (entity.getHeldItem().nbt().getString('WeaponType') == 'tgheroes:soulsword' 
        && !entity.as("PLAYER").isUsingItem() && entity.isOnGround() && entity.isSprinting());

        
    default:
        return true;
    }
}

function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}


function isModifierEnabled(entity, modifier) {
	if (modifier.id() == "basic") {
        return !entity.getData("tgheroes:dyn/darkchild");
	}
	if (modifier.id() == "darkchild1") {
        return entity.getData("tgheroes:dyn/darkchild");
	}

    if (modifier.id() == "basic_beam") {
        return !entity.getData("tgheroes:dyn/darkchild");
	}
	if (modifier.id() == "dark_beam") {
        return entity.getData("tgheroes:dyn/darkchild");
	}


	return true;
   
}