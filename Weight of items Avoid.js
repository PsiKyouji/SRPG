/*

■Overview of plug-ins
Take into account total weight of inventory (weapons and items) when calculating Avoid

Modified from Rantaro's AbilityCalculator_getAgility_mod.js which I recommend getting to work alongside this plugin

■ How to use
1. Put this script in plugin folder

2. Customize as noted below

3. Have fun

■ Creator
PsiKyouji

■Terms of use
https://github.com/PsiKyouji/SRPG/blob/main/README.md

■ Update history
2023/01/23 Released

*/



(function Subtractweightfromavoid() {
	

//   Processing to obtain the total weight by adding the weight of ALL belongings, equipped or not.
AbilityCalculator._getPossesionItemGrossWeight = function(unit) {
	var i, item, count;
	var value = 0;
	
	count = UnitItemControl.getPossessionItemCount(unit);
	
	for (i = 0; i < count; i++) {
		item = UnitItemControl.getItem(unit, i);
		if (item !== null) {
			value += item.getWeight();
		}
	}
	
	return value;
};


// Subtraction method is Subtract total weight of inventory from Agility
// This method tends to make weight a heavy burden on agility in games that expect units to have multiple weapons and tools.
 AbilityCalculator.getAvoid= function(unit, weapon) {
	var avoid, value, param;
	var spd = RealBonus.getSpd(unit);
	var cls = unit.getClass();
	
	// Avoid is speed*2 by default
	avoid = (spd * 2);
	
			// If class type gains terrain bonus, add the avoid rate of terrain.
	if (cls.getClassType().isTerrainBonusEnabled()) {
		terrain = PosChecker.getTerrainFromPos(unit.getMapX(), unit.getMapY());
		if (terrain !== null) {
			avoid += terrain.getAvoid();
		}
	}
	
	// If physique is valid, judge by Build, otherwise judge by Strength
	if (DataConfig.isBuildDisplayable()) {
		param = ParamBonus.getBld(unit);
	}
	else {
			param = ParamBonus.getStr(unit) ; // Add "+ParamBonus.getStr(unit)" into this formula if you wish for Mag to affect weight, kinda like a holding spell.
		}


//	value = weapon.getWeight() - param;
	//  Calculate the total weight by adding all the weights of your belongings
	value = this._getPossesionItemGrossWeight(unit) - param ;
		
	if (value > 0) {
		// If the parameter is lower than the weight, lower the agility by the difference
		avoid -= value;
	}
		
	return avoid;
};


})();