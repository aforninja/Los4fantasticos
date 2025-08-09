function init(hero) {
    hero.setName("Doctor Doom/Victor Von Doom");
    hero.setTier(7);
    
    hero.setHelmet("Helmet");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Pants");
    hero.setBoots("Boots");
	hero.addPrimaryEquipment("fisktag:weapon{WeaponType:tgheroes:darkhold}", false, item => item.nbt().getString("WeaponType") == 'tgheroes:darkhold');
	
    
    hero.addPowers("tgheroes:doctor_doom_magic", "tgheroes:doctor_doom_suit");
	hero.addAttribute("PUNCH_DAMAGE", 5.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 6.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.05, 1);

    hero.addKeyBind("SHIELD", "Doom Shield", 3);
	hero.addKeyBindFunc("func_CHOOSE", spellChoose, "Choose Shield", 3);
    hero.addKeyBind("CHARGED_BEAM", "Concussive Blasts", 1);
    hero.addKeyBind("SPELL_MENU", "Doom's Magic", 2);
    hero.addKeyBind("TELEKINESIS", "Telekinesis", 5);
   
	hero.addKeyBind("AIM", "Aim", 4);
	
	hero.addKeyBindFunc("TELEPORT", tp, "key.teleport", 1);         
	hero.addKeyBind("ENERGY_PROJECTION", "", -1);
	
    hero.addSoundEvent("STEP", "tgheroes:doom_steps1");
	
	hero.addKeyBindFunc("ELECTRIC_MELEE", (player, manager) => {
        if (!player.getData("tgheroes:dyn/electric") && player.getData("tgheroes:dyn/electric_timer") == 0) {
            manager.setData(player, "tgheroes:dyn/electric", true);
            manager.setData(player, "tgheroes:dyn/electric_timer_sound", 0.1);
			
        }
        return true;
    }, "Electric Shock", 5);

    hero.addDamageProfile("ELECTRO", {
        "types": {
            "ELECTRICITY": 1.0
        },
        "properties": {
            "COOK_ENTITY": false,
            "HEAT_TRANSFER": 10
        }
    });
	
	
	
	hero.setTickHandler((entity, manager) => {
		
		manager.incrementData(entity, "tgheroes:dyn/teleport", 10, 30, entity.getData("fiskheroes:teleport_timer") > 0)
		
		
		if (entity.getData("tgheroes:dyn/aim_int") == 0 && entity.getData("fiskheroes:beam_shooting_timer") == 0 && entity.getData("fiskheroes:beam_shooting") == 0) {
            manager.setData(entity, "tgheroes:dyn/aim_int", 1);
        }else if (entity.getData("tgheroes:dyn/aim_int") == 1 && entity.getData("fiskheroes:beam_shooting_timer") == 0 && entity.getData("fiskheroes:beam_shooting") == 0) {
            manager.setData(entity, "tgheroes:dyn/aim_int", 0);
        }
		
		
        manager.incrementData(entity, "fiskheroes:dyn/booster_timer", 2, entity.getData("fiskheroes:flying"));
		   
		   
		   var choose = entity.getData("tgheroes:dyn/spell_choose");
	    
		manager.incrementData(entity, "tgheroes:dyn/spell_basic", 1, 1, entity.getData("tgheroes:dyn/spell_choose") == 1);
		manager.incrementData(entity, "tgheroes:dyn/spell_heal", 1, 1, entity.getData("tgheroes:dyn/spell_choose") == 2);
		
		if (choose != 1 && choose != 2) {
        manager.setData(entity, "tgheroes:dyn/spell_choose", 1);      
		}
		
		//SOUND_START	    
        
		
		if (entity.getData("tgheroes:dyn/electric_timer") > 0.2) {
        manager.setData(entity, "tgheroes:dyn/electric_timer_sound", 0);
        }
		
        if (entity.getData("tgheroes:dyn/electric_timer_sound") > 0.1 && !entity.getData("tgheroes:dyn/electric_timer_sound") == 0 )  {
			entity.playSound("tgheroes:doom_electro", 1, 1.15 - Math.random() * 0.3);
		}
		
	//SOUND_FINISH	
		
		
		manager.incrementData(entity, "tgheroes:dyn/electric_timer", 110, 1000, entity.getData("tgheroes:dyn/electric"));
		
        if (entity.getData("tgheroes:dyn/electric_timer") > 0.2 && entity.getData("tgheroes:dyn/electric")) {
            var list = entity.world().getEntitiesInRangeOf(entity.eyePos(), 6.0);
            list.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "ELECTRO", "%s Electrified by the protection system of Doctor Doom's suit", 3.0, entity);

                }
            });
            if (entity.getData("tgheroes:dyn/electric_timer") == 1) {
                manager.setData(entity, "tgheroes:dyn/electric", false);
            }

        }
			
	});
	
	hero.supplyFunction("canAim", canAim);
	hero.setKeyBindEnabled(isKeyBindEnabled);
	hero.setModifierEnabled(isModifierEnabled);	   
	hero.addAttributeProfile("THROW", throwProfile);
	hero.setAttributeProfile(getProfile);
}

function getProfile(entity) {
	if (entity.getData("tgheroes:dyn/electric") || entity.getData ("tgheroes:dyn/spell_heal") && entity.getData("fiskheroes:shield_blocking_timer")) {
        return "THROW";
    }
	return false;
}

function throwProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("BASE_SPEED", -2.0, 0);
	profile.addAttribute("JUMP_HEIGHT", -2.0, 0);
	profile.addAttribute("PUNCH_DAMAGE", -2.0, 0);
}

function tp(entity, manager) {
    manager.setData(entity, "fiskheroes:teleport_delay", 10)
    return true
}

function spellChoose(entity, manager) {
var choose = entity.getData("tgheroes:dyn/spell_choose");

if (choose >= 1 && choose < 2) {
    manager.setData(entity, "tgheroes:dyn/spell_choose", choose + 1);
}
if (choose == 2) {
    manager.setData(entity, "tgheroes:dyn/spell_choose", 1);
}
    return true;
}

function isModifierEnabled(entity, modifier) {
	if (modifier.id() == "basic_0") {
        return entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).isEmpty() ;
	}
	if (modifier.id() == "basic_2") {
        return entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).isEmpty() && !entity.getData("fiskheroes:telekinesis");
	}
	if (modifier.id() == "darkhold_0") {
        return !entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).isEmpty();
	}
	if (modifier.id() == "darkhold_1") {
        return !entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).isEmpty();
	}
	if (modifier.id() == "darkhold_2") {
        return !entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).isEmpty() && !entity.getData("fiskheroes:telekinesis");
	}
	
	var choose = entity.getData("tgheroes:dyn/spell_choose");
	
    switch (modifier.name()) {
    case "fiskheroes:shield":
        return modifier.id() == "magic" && choose == 1 && !entity.getData("fiskheroes:aiming") || modifier.id() == "forcefield" && choose  == 2 && !entity.getData("fiskheroes:aiming"); 
    case "fiskheroes:controlled_flight":
        return modifier.id() == "boosters" && entity.getWornChestplate().suitType() == "tgheroes:doctor_doom" 
		|| modifier.id() == "boosters" && entity.getWornChestplate().suitType() == "tgheroes:doctor_doom/ii" 
		|| modifier.id() == "boosters" && entity.getWornChestplate().suitType() == "tgheroes:doctor_doom/2099" 
		|| modifier.id() == "boosters" && entity.getWornChestplate().suitType() == "tgheroes:doctor_doom/god" 
		|| modifier.id() == "cloak" && entity.getWornChestplate().suitType() == "tgheroes:doctor_doom/ss";
	case "fiskheroes:repulsor_blast":
            return !entity.getData("fiskheroes:energy_projection");		
    default:
        return true;
    }
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "func_CHOOSE":
            return entity.isSneaking() && !entity.getData("fiskheroes:aiming") && !entity.getInterpolatedData("tgheroes:dyn/teleport") && !entity.getInterpolatedData("tgheroes:dyn/electric") ;
		case "SHIELD":
            return !entity.isSneaking() && !entity.getData("fiskheroes:aiming") && !entity.getInterpolatedData("tgheroes:dyn/teleport") && !entity.getInterpolatedData("tgheroes:dyn/electric");
		case "TELEPORT":
            return entity.getData("fiskheroes:aiming") && !entity.getInterpolatedData("tgheroes:dyn/teleport") && !entity.getInterpolatedData("tgheroes:dyn/electric");
		case "ENERGY_PROJECTION":
            return entity.getData("fiskheroes:aiming") && !entity.getInterpolatedData("tgheroes:dyn/teleport") && !entity.getInterpolatedData("tgheroes:dyn/electric") && !entity.getData("fiskheroes:telekinesis");
		case "TELEKINESIS":
            return entity.getData("fiskheroes:aiming") && !entity.getInterpolatedData("tgheroes:dyn/teleport") && !entity.getInterpolatedData("tgheroes:dyn/electric");
		case "CHARGED_BEAM":
            return !entity.getData("fiskheroes:aiming") && !entity.getInterpolatedData("tgheroes:dyn/teleport") && !entity.getInterpolatedData("tgheroes:dyn/electric");
		case "SPELL_MENU":
            return !entity.getData("fiskheroes:aiming") && !entity.getInterpolatedData("tgheroes:dyn/teleport") && !entity.getInterpolatedData("tgheroes:dyn/electric");
		case "ELECTRIC_MELEE":
            return !entity.getData("fiskheroes:aiming") && !entity.getInterpolatedData("tgheroes:dyn/teleport") && !entity.getInterpolatedData("tgheroes:dyn/electric") && entity.isOnGround();
		case "AIM":
            return !entity.getInterpolatedData("tgheroes:dyn/teleport") && !entity.getInterpolatedData("tgheroes:dyn/electric");
	default:
		return true;
	}
}

function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}