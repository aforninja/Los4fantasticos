function init(hero) {
    hero.setName("Invisible Woman/Susan Storm");
    hero.setTier(3);
    
    hero.setHelmet("Hair");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Pants");
    hero.setBoots("Boots");
    
    hero.addPowers("tgheroes:sue_power");
    hero.addAttribute("PUNCH_DAMAGE", 3.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.05, 1);
    hero.addAttribute("FALL_RESISTANCE", 3.0, 0);

    hero.addKeyBind("SHIELD", "Forcefield", 1);
	hero.addKeyBind("INVIS", "Invisibility", 2);
	hero.addKeyBind("CHARGED_BEAM", "Forcefield Blast", 3);
	hero.addKeyBind("AIM", "Aim", 4);
	hero.addKeyBindFunc("func_CHOOSE", spellChoose, "Choose Spell", 4);
	hero.addKeyBind("TELEKINESIS", "Telekinesis", 5);
	
	
	hero.setTickHandler((entity, manager) => {
		if (entity.getData("fiskheroes:shield") && !entity.isOnGround()) {
            manager.setData(entity, "fiskheroes:flying", true);
        }
		
		if (!entity.getData("fiskheroes:shield") && entity.isOnGround()) {
            manager.setData(entity, "fiskheroes:flying", false);
        }
		
        if (entity.getData("tgheroes:dyn/invis_timer") == 1) {
            manager.setDataWithNotify(entity, "fiskheroes:invisible", true);
             }

             if (entity.getData("tgheroes:dyn/invis_timer") == 0) {
            manager.setDataWithNotify(entity, "fiskheroes:invisible", false);
             }
		
		
		 var choose = entity.getData("tgheroes:dyn/spell_choose");
	    
    manager.incrementData(entity, "tgheroes:dyn/spell_basic", 1, 1, entity.getData("tgheroes:dyn/spell_choose") == 1);
    manager.incrementData(entity, "tgheroes:dyn/spell_heal", 1, 1, entity.getData("tgheroes:dyn/spell_choose") == 2);
	manager.incrementData(entity, "tgheroes:dyn/spell_bind", 1, 1, entity.getData("tgheroes:dyn/spell_choose") == 3);
	
    
    if (choose != 1 && choose != 2 && choose != 3) {
        manager.setData(entity, "tgheroes:dyn/spell_choose", 1);
        
    }
    return true;
    });
	
	hero.supplyFunction("canAim", canAim);
	hero.setKeyBindEnabled(isKeyBindEnabled);
	hero.setModifierEnabled(isModifierEnabled);
}

function spellChoose(entity, manager) {
var choose = entity.getData("tgheroes:dyn/spell_choose");

if (choose >= 1 && choose < 3) {
    manager.setData(entity, "tgheroes:dyn/spell_choose", choose + 1);
}
if (choose == 3) {
    manager.setData(entity, "tgheroes:dyn/spell_choose", 1);
}
    return true;
}

function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}

function isModifierEnabled(entity, modifier) {
	
	var choose = entity.getData("tgheroes:dyn/spell_choose");

    switch (modifier.name()) {
    case "fiskheroes:repulsor_blast":
        return modifier.id() == "basic" && choose == 1 
		|| modifier.id() == "shield" && choose  == 2
		|| modifier.id() == "invis" && choose  == 3;
	case "fiskheroes:controlled_flight":
		 return entity.getData("fiskheroes:shield");
    default:
        return true;
    }
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
		case "func_CHOOSE":
            return entity.isSneaking() && !entity.getData("fiskheroes:shield");
        case "AIM":
            return !entity.isSneaking() && !entity.getData("fiskheroes:shield") && !entity.getData("fiskheroes:telekinesis");	
		case "CHARGED_BEAM":
            return !entity.getData("fiskheroes:shield") && !entity.getData("fiskheroes:telekinesis");	
		case "TELEKINESIS":
            return !entity.getData("fiskheroes:shield");	
			
	default:
		return true;
	}
}