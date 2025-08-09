function init(hero) {
    hero.setName("Gambit/Remy LeBeau");
    hero.setTier(3);
    
    hero.setHelmet("Hair");
    hero.setChestplate("Chestpiece");
    hero.setLeggings("Pants");
    hero.setBoots("Boots");
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:tgheroes:staff_gambit}", true, item => item.nbt().getString("WeaponType") == 'tgheroes:staff_gambit');
    
    hero.addPowers("tgheroes:xmen_gambit");
	hero.addAttribute("PUNCH_DAMAGE", 4.0, 0);
    hero.addAttribute("WEAPON_DAMAGE", 2.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 3.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.1, 1);
    
    hero.addKeyBind("CHARGE_ENERGY", "key.chargeEnergy", 4);
    hero.addKeyBind("CHARGED_BEAM", "Throw Card", 1);
	hero.addKeyBind("CARDS", "Draw Cards", 4);

    
    hero.setKeyBindEnabled(isKeyBindEnabled);
	hero.setModifierEnabled(isModifierEnabled);
	hero.setTickHandler((entity, manager) => {
        if (!entity.getHeldItem().isEmpty()) {
        manager.setData(entity, "tgheroes:dyn/card", false);
        }
    });
}



function isModifierEnabled(entity, modifier) {
	if (modifier.id() == "card") {
        return entity.getHeldItem().isEmpty();
	}
	return true;
   
}

function isKeyBindEnabled(entity, keyBind) {  
	switch (keyBind) {
	case "CHARGED_BEAM":
        return entity.getData("tgheroes:dyn/card");
	case "CHARGE_ENERGY":
        return entity.getHeldItem().name() == "fisktag:weapon" && (entity.getHeldItem().nbt().getString('WeaponType') == 'tgheroes:staff_gambit') ;
	case "CARDS":
        return entity.getHeldItem().isEmpty();
    default:
        return true;
    }
}

