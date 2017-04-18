var indexDate = 0;
var indexHigh = 3;
var indexOpen = 2;
var indexLow = 4;
var indexClose = 1;
var indexVolume = 5;

var data = [
	['2016-10-10', 18.62, 17.95, 18.7, 17.95, 37767261], 
	['2016-10-11', 18.65, 18.63, 18.82, 18.5, 26604178], 
	['2016-10-12', 18.57, 18.52, 18.67, 18.43, 19279528], 
	['2016-10-13', 18.68, 18.62, 18.73, 18.53, 19591887], 
	['2016-10-14', 18.5, 18.6, 18.64, 18.3, 19835545], 
	['2016-10-17', 18.11, 18.51, 18.57, 18.1, 22946743], 
	['2016-10-18', 18.78, 18.11, 18.79, 18.11, 40559128], 
	['2016-10-19', 18.57, 18.77, 18.77, 18.53, 20223958], 
	['2016-10-20', 18.6, 18.59, 18.67, 18.52, 14819030], 
	['2016-10-21', 18.71, 18.59, 19.05, 18.53, 36238013], 
	['2016-10-24', 19.59, 18.71, 19.93, 18.65, 96464552], 
	['2016-10-25', 19.49, 19.49, 19.67, 19.29, 30829300], 
	['2016-10-26', 19.52, 19.43, 19.75, 19.38, 26579260], 
	['2016-10-27', 19.55, 19.5, 19.7, 19.33, 26895137], 
	['2016-10-28', 20.04, 20, 21.41, 19.89, 95428598], 
	['2016-10-31', 20.53, 19.7, 20.76, 19.7, 67645515], 
	['2016-11-1', 20.5, 20.38, 20.95, 20.32, 58495956], 
	['2016-11-2', 20.66, 20.52, 21.06, 20.35, 58975834], 
	['2016-11-3', 21.07, 20.5, 21.55, 20.47, 101554613], 
	['2016-11-4', 20.54, 21.09, 21.38, 20.41, 58391503], 
	['2016-11-7', 20.6, 20.54, 20.73, 20.34, 33315313], 
	['2016-11-8', 20.74, 20.78, 21.21, 20.61, 40395702], 
	['2016-11-9', 20.23, 20.75, 20.77, 20, 57069825], 
	['2016-11-10', 20.71, 20.61, 21.08, 20.5, 52490557], 
	['2016-11-11', 21.31, 20.68, 21.52, 20.65, 93357698], 
	['2016-11-14', 21.4, 21.29, 22.16, 21.12, 100595666], 
	['2016-11-15', 20.99, 21.34, 21.68, 20.94, 51663437], 
	['2016-11-16', 20.98, 21.1, 21.18, 20.7, 42989895], 
	['2016-11-17', 20.92, 20.9, 20.99, 20.68, 31960613], 
	['2016-11-18', 20.41, 20.78, 20.89, 20.29, 35823888], 
	['2016-11-21', 20.25, 20.3, 20.79, 20.03, 64939466], 
	['2016-11-22', 20.25, 20.28, 20.57, 20.16, 87988747], 
	['2016-11-23', 20.18, 20.31, 20.51, 20.08, 51553409], 
	['2016-11-24', 20.32, 20.11, 20.6, 20.07, 59375668], 
	['2016-11-25', 20.36, 20.27, 20.38, 19.8, 45891823], 
	['2016-11-28', 20.19, 20.5, 20.6, 20.01, 67426067], 
	['2016-11-29', 20.04, 20, 20.32, 19.81, 60522364], 
	['2016-11-30', 19.83, 19.94, 20.2, 19.8, 42499860], 
	['2016-12-1', 19.9, 19.82, 20.01, 19.73, 33946477], 
	['2016-12-2', 19.58, 19.9, 19.92, 19.31, 51340043], 
	['2016-12-5', 18.93, 19.38, 19.4, 18.79, 62241605], 
	['2016-12-6', 18.67, 18.94, 19.03, 18.62, 37221350], 
	['2016-12-7', 18.81, 18.62, 18.83, 18.51, 27033979], 
	['2016-12-8', 18.52, 18.85, 18.87, 18.48, 28049538], 
	['2016-12-9', 18.9, 18.53, 19.05, 18.5, 64486370], 
	['2016-12-12', 18.48, 18.8, 18.83, 18.12, 71860509], 
	['2016-12-13', 18.35, 18.45, 18.55, 18.24, 26888074], 
	['2016-12-14', 18.05, 18.34, 18.35, 17.99, 24637532], 
	['2016-12-15', 18.06, 17.96, 18.18, 17.88, 34931627], 
	['2016-12-16', 18.07, 18.08, 18.16, 17.95, 22147979], 
	['2016-12-19', 17.91, 18.03, 18.04, 17.86, 16309176], 
	['2016-12-20', 17.9, 17.85, 17.93, 17.69, 25377491], 
	['2016-12-21', 18.19, 18, 18.42, 17.98, 50761859], 
	['2016-12-22', 18.07, 18.15, 18.18, 18.01, 15963772], 
	['2016-12-23', 17.8, 18.1, 18.1, 17.7, 22030421], 
	['2016-12-26', 18.02, 17.69, 18.07, 17.58, 32014973], 
	['2016-12-27', 18.04, 18, 18.28, 17.93, 20741155], 
	['2016-12-28', 18.04, 18, 18.13, 17.95, 14746418], 
	['2016-12-29', 17.87, 17.98, 18.08, 17.86, 17883565], 
	['2016-12-30', 17.86, 17.87, 17.99, 17.67, 25495431], 
	['2017-1-3', 18.19, 17.92, 18.29, 17.92, 32313226], 
	['2017-1-4', 18.44, 18.19, 18.5, 18.16, 35758846], 
	['2017-1-5', 18.35, 18.41, 18.54, 18.32, 23907977], 
	['2017-1-6', 18.15, 18.37, 18.41, 18.07, 24394716], 
	['2017-1-9', 18.15, 18.13, 18.25, 18.07, 23064790], 
	['2017-1-10', 18.04, 18.23, 18.24, 17.99, 18406550], 
	['2017-1-11', 17.83, 18.05, 18.12, 17.8, 22836120], 
	['2017-1-12', 17.74, 17.85, 17.97, 17.72, 18201907], 
	['2017-1-13', 17.88, 17.67, 17.96, 17.66, 21452796], 
	['2017-1-16', 18.16, 17.81, 18.24, 17.65, 60872340], 
	['2017-1-17', 18.06, 18.06, 18.16, 17.85, 17152057], 
	['2017-1-18', 18.13, 18.05, 18.27, 17.93, 18078088], 
	['2017-1-19', 18.17, 18.12, 18.27, 18.05, 17407300], 
	['2017-1-20', 18.45, 18.13, 18.5, 18.1, 28460289], 
	['2017-1-23', 18.4, 18.45, 18.68, 18.36, 18800933], 
	['2017-1-24', 18.36, 18.37, 18.49, 18.22, 20032071], 
	['2017-1-25', 18.4, 18.37, 18.46, 18.24, 11541737], 
	['2017-1-26', 18.47, 18.42, 18.6, 18.39, 16773706], 
	['2017-2-3', 18.15, 18.47, 18.52, 18.13, 17290774], 
	['2017-2-6', 18.1, 18.23, 18.23, 18, 22148830], 
	['2017-2-7', 17.97, 18.1, 18.11, 17.83, 18864260], 
	['2017-2-8', 18.27, 17.97, 18.33, 17.82, 30869293], 
	['2017-2-9', 18.24, 18.21, 18.42, 18.18, 29650255], 
	['2017-2-10', 18.32, 18.24, 18.45, 18.02, 46673453], 
	['2017-2-13', 18.5, 18.34, 18.62, 18.3, 60691621], 
	['2017-2-14', 18.4, 18.52, 18.63, 18.35, 25137269], 
	['2017-2-15', 18.31, 18.39, 18.54, 18.28, 32693249], 
	['2017-2-16', 18.38, 18.31, 18.49, 18.2, 33105928], 
	['2017-2-17', 18.3, 18.49, 18.88, 18.29, 72387155], 
	['2017-2-20', 18.52, 18.3, 18.53, 18.15, 47443354], 
	['2017-2-21', 18.86, 18.59, 19.04, 18.56, 77292693], 
	['2017-2-22', 18.86, 18.8, 18.89, 18.67, 27126046], 
	['2017-2-23', 18.45, 18.79, 18.94, 18.34, 45136737], 
	['2017-2-24', 18.48, 18.47, 18.58, 18.35, 26233301], 
	['2017-2-27', 18.18, 18.43, 18.52, 18.15, 34596840], 
	['2017-2-28', 18.15, 18.19, 18.29, 18.05, 24170099], 
	['2017-3-1', 18.13, 18.15, 18.25, 18.07, 26048529], 
	['2017-3-2', 18.1, 18.2, 18.43, 18.05, 44025880], 
	['2017-3-3', 18.01, 18.06, 18.11, 17.91, 24929304], 
	['2017-3-6', 18.16, 18.03, 18.19, 17.93, 22337688], 
	['2017-3-7', 18.1, 18.16, 18.18, 17.98, 17565909], 
	['2017-3-8', 18.11, 18.12, 18.18, 18.03, 19379747], 
	['2017-3-9', 18.03, 18.1, 18.11, 17.86, 25933666], 
	['2017-3-10', 17.78, 17.96, 18.05, 17.74, 25958765], 
	['2017-3-13', 17.87, 17.75, 17.89, 17.58, 23379282], 
	['2017-3-14', 17.82, 17.86, 17.93, 17.76, 14775789], 
	['2017-3-15', 17.76, 17.82, 17.82, 17.7, 16891378], 
	['2017-3-16', 18.08, 17.82, 18.12, 17.8, 44664473], 
	['2017-3-17', 17.8, 18.09, 18.13, 17.74, 28294596], 
	['2017-3-20', 17.64, 17.82, 17.84, 17.55, 30157199], 
	['2017-3-21', 17.38, 17.65, 17.68, 17.3, 43458662], 
	['2017-3-22', 16.91, 17.3, 17.3, 16.8, 53232885], 
	['2017-3-23', 16.97, 16.91, 17.13, 16.8, 28108049], 
	['2017-3-24', 17.02, 17.01, 17.21, 16.83, 43602031], 
	['2017-3-27', 17.02, 17.05, 17.22, 17, 31488748], 
	['2017-3-28', 17.02, 17.07, 17.18, 16.93, 28921017], 
	['2017-3-29', 16.82, 17.03, 17.09, 16.8, 27714670], 
	['2017-3-30', 16.81, 16.8, 16.91, 16.63, 26720975], 
	['2017-3-31', 16.81, 16.85, 16.89, 16.71, 17634526], 
	['2017-4-5', 17.19, 16.81, 17.2, 16.81, 42519157], 
	['2017-4-6', 17.18, 17.16, 17.3, 17.13, 28654621], 
	['2017-4-7', 17.18, 17.19, 17.25, 17.01, 29347956], 
	['2017-4-10', 17.04, 17.19, 17.27, 17.02, 22149971], 
	['2017-4-11', 17.04, 17.03, 17.11, 16.76, 28469617], 
	['2017-4-12', 17.39, 17.13, 17.57, 17.1, 70469690], 
	['2017-4-13', 17.27, 17.26, 17.41, 17.18, 21285376], 
	['2017-4-14', 17.11, 17.21, 17.28, 16.92, 24649781], 
	['2017-4-17', 17.14, 17.01, 17.25, 16.8, 32092600]
];