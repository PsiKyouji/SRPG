
/*

■Overview of plug-ins
Modify the limit of States. That's it.

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

(function() {
	
DataConfig.getMaxStateCount = function() {
		return 6; //Edit to change number of States. However, it will overflow past 6 so you need to find other plugins to expand the space in UnitMenu
};

})();