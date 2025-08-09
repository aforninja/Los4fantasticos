function init(hero) {
    hero.setName("Cable/Nathan Summers");
    hero.setTier(6);
    
    hero.setHelmet("Hair");
    hero.setChestplate("Chestpiece");
    hero.setLeggings("Leggings");
    hero.setBoots("Boots");
	hero.addPrimaryEquipment("fisktag:weapon{WeaponType:tgheroes:rifle_energy}", true, item => item.nbt().getString("WeaponType") == 'tgheroes:rifle_energy');
	hero.addPrimaryEquipment("fisktag:weapon{WeaponType:tgheroes:pistol_energy}", true, item => item.nbt().getString("WeaponType") == 'tgheroes:pistol_energy');

    hero.addPowers("tgheroes:techno_organ_phys", "tgheroes:xmen_cable");
    hero.addAttribute("PUNCH_DAMAGE", 5.0, 0);
    hero.addAttribute("WEAPON_DAMAGE", 5.0, 0);
    hero.addAttribute("JUMP_HEIGHT", 1.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 9.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.1, 1);
    
    hero.addKeyBind("AIM", "key.aim", -1);
	hero.addKeyBind("UTILITY_BELT", "Grenades", 4);
	hero.addKeyBindFunc("func_CHANGE_BATARANG", changeBatarang, "Change Grenade", 4); 
    hero.addKeyBind("GUN_RELOAD", "key.reload", 1);
	hero.addKeyBind("CHARGED_BEAM", "Energy Projection", 1);
	hero.addKeyBind("TELEPORT", "Teleport", 2);
	hero.addKeyBind("TELEKINESIS", "Telekinesis", 3);
	hero.addKeyBind("SHIELD", "Forcefield", 5);
	
	hero.setHasPermission(hasPermission);
	hero.supplyFunction("canAim", canAim);
	hero.setTickHandler(tickHandler);
	hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);

}

function tickHandler(entity, manager) {
        var type = entity.getData("tgheroes:dyn/grenade_type");
    
         if (type != 1 && type != 2 && type != 3) {
             manager.setData(entity, "tgheroes:dyn/grenade_type", 1);
            }

        manager.incrementData(entity, "tgheroes:dyn/grenade_basic", 1, 1, entity.getData('fiskheroes:utility_belt_type') == 0 && type == 1);
        manager.incrementData(entity, "tgheroes:dyn/grenade_flashbang", 1, 1, entity.getData('fiskheroes:utility_belt_type') == 0 && type == 2);
        manager.incrementData(entity, "tgheroes:dyn/grenade_eterno_tutrid", 1, 1, entity.getData('fiskheroes:utility_belt_type') == 0 && type == 3);

        if (type == 1) {
            manager.setData(entity, "tgheroes:dyn/grenade_flashbang", 0);
            manager.setData(entity, "tgheroes:dyn/grenade_eterno_tutrid", 0);
        }

        if (type == 2) {
            manager.setData(entity, "tgheroes:dyn/grenade_basic", 0);
            manager.setData(entity, "tgheroes:dyn/grenade_eterno_tutrid", 0);
        }

        if (type == 3) {
            manager.setData(entity, "tgheroes:dyn/grenade_flashbang", 0);
            manager.setData(entity, "tgheroes:dyn/grenade_basic", 0);
        }

         return true;

}

function hasPermission(entity, permission) {
    return permission == "USE_FISKTAG_GUN" || permission == "USE_GUN";
}

function canAim(entity) {
    return entity.getHeldItem().isLaserGun() || entity.getHeldItem().isGun();
}

function changeBatarang(entity, manager) {
        var type = entity.getData("tgheroes:dyn/grenade_type");
        manager.setData(entity, "tgheroes:dyn/grenade_type", type >= 3 ? 1 : type + 1);
        return true;
}

function isModifierEnabled(entity, modifier) {
        var type = entity.getData("tgheroes:dyn/grenade_type");

        switch (modifier.name()) {
         case "fiskheroes:equipment":
             return modifier.id() == "basic" && type == 1 
             || modifier.id() == "flashbang" && type == 2 
             || modifier.id() == "eterno_tutrid" && type == 3;
        default:
            return true;
        }
}

function isKeyBindEnabled(entity, keyBind) {
	var type = entity.getData("tgheroes:dyn/grenade_type");
        if (keyBind == "func_CHANGE_BATARANG") {
            return entity.isSneaking();
	}
	switch (keyBind) {
		case "UTILITY_BELT":
			return !entity.isSneaking(); 
        case "TELEKINESIS":
            return entity.getHeldItem().isEmpty();
		case "GUN_RELOAD":
			return  entity.getHeldItem().isGun();
		case "CHARGED_BEAM":
			return  entity.getHeldItem().isEmpty() && !entity.getData("fiskheroes:telekinesis");	
		default:
			return true;
		}
}

