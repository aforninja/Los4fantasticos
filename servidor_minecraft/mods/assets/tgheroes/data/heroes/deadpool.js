var landing = implement("tgheroes:external/giant_landing");
function init(hero) {
    hero.setName("Deadpool/Wade Wilson");
    hero.setTier(5);
    
    hero.setHelmet("Hair");
    hero.setChestplate("Chestpiece");
    hero.setLeggings("Leggings");
    hero.setBoots("Boots");
	hero.addPrimaryEquipment("fiskheroes:katana{Dual:1}", true, item => item.nbt().getBoolean("Dual"));
    hero.addPrimaryEquipment("fiskheroes:desert_eagle{Dual:1}", true, item => item.nbt().getBoolean("Dual"));

	hero.addPrimaryEquipment("fisktag:weapon{WeaponType:tgheroes:barret_pool}", true, item => item.nbt().getString("WeaponType") == 'tgheroes:barret_pool');
	
	hero.addPrimaryEquipment("fisktag:weapon{WeaponType:tgheroes:m4_pool}", true, item => item.nbt().getString("WeaponType") == 'tgheroes:m4_pool');
	
	hero.addPrimaryEquipment("fisktag:weapon{WeaponType:tgheroes:mac_10_dual_pool}", true, item => item.nbt().getString("WeaponType") == 'tgheroes:mac_10_dual_pool');
	
	hero.addPrimaryEquipment("fisktag:weapon{WeaponType:tgheroes:rocket_launcher_pool}", true, item => item.nbt().getString("WeaponType") == 'tgheroes:rocket_launcher_pool');
	
	hero.addPrimaryEquipment("fisktag:weapon{WeaponType:tgheroes:spas_12_pool}", true, item => item.nbt().getString("WeaponType") == 'tgheroes:spas_12_pool');
	

    hero.addPowers("tgheroes:xmen_deadpool");
    hero.addAttribute("PUNCH_DAMAGE", 5.0, 0);
    hero.addAttribute("WEAPON_DAMAGE", 5.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 6.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.1, 1);
    
    hero.addKeyBind("AIM", "key.aim", -1);
    hero.addKeyBind("GUN_RELOAD", "key.reload", 1);
	hero.addKeyBindFunc("TELEPORT", tp, "key.teleport", 4);   
	
	hero.setHasPermission(hasPermission);
	hero.supplyFunction("canAim", canAim);
    hero.setKeyBindEnabled(isKeyBindEnabled);

    hero.setTickHandler((entity, manager) => {
		
		landing.tick(entity, manager);
		manager.incrementData(entity, "tgheroes:dyn/teleport", 10, 30, entity.getData("fiskheroes:teleport_timer") > 0)
			
	});
}

function hasPermission(entity, permission) {
    return permission == "USE_FISKTAG_GUN" || permission == "USE_GUN" || permission == "USE_DEADPOOL_GUN";
}

function canAim(entity) {
    return entity.getHeldItem().isLaserGun() || entity.getHeldItem().isGun();
}


function isKeyBindEnabled(entity, keyBind) {
	switch (keyBind) {
        case "TELEPORT":
            return !entity.getData("fiskheroes:aiming") && !entity.getInterpolatedData("tgheroes:dyn/teleport");
		case "GUN_RELOAD":
			return  entity.getHeldItem().isLaserGun() || entity.getHeldItem().isGun();
		case "CHARGED_BEAM":
			return  entity.getHeldItem().isEmpty();
		default:
			return true;
		}
}

function tp(entity, manager) {
    manager.setData(entity, "fiskheroes:teleport_delay", 10)
    return true
}