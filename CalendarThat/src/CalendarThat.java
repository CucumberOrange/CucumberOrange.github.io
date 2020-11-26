import java.util.Scanner;
import javax.swing.JOptionPane;
public class CalendarThat {
	public static void main(String[] args) {
			getCalendar();
		
	}//main2
	
	public static void getCalendar() {
		String month = "";
		String year = "";
		int y = 0;
		int m = 0;
		String error = "";
		Scanner in = new Scanner(System.in);
		do {
			year = JOptionPane.showInputDialog(error + "please enter a year between 1500 and 9999: ");
			if(year == null) {
				System.exit(0);
			}//ifNoInput
			try {
			y = Integer.parseInt(year);
			}catch(Exception e) {
				error = year + " is not a year. Try again please. ";
				continue;
			}//tryCatch
			if(y > 9999 | y < 1500) {
				error = y + " is not within the given parameters (1500 - 9999).";
				continue;
			}else {
				break;
			}
		}while(true);
		error = "";
		do {
			month = JOptionPane.showInputDialog(error + "Please enter a month: ");
			if(month == null) {
				System.exit(0);
			}//ifNoInput
			try {
				m = Integer.parseInt(month);
			}catch(Exception e) {
				//If the user enters a word or a big number, the error message is shown and the question is repeated
				error = month + " is not a month. Try again please. ";
				continue;
			}//tryCatch
			if(m > 12 | m <= 0) {
				error = "There are 12 months in a year, not " + m + " .";
				continue;
			}else {
				break;
			}
		}while(true);
		String weekDay = "M   T   W   T   F   S   S";
		int[] week1 = new int[7];
		int[] week2 = new int[7];
		int[] week3 = new int[7];
		int[] week4 = new int[7];
		int[] week5 = new int[7];
		int[] week6 = new int[7];
		System.out.println(getMonthName(m) + " " + y);
		System.out.println(weekDay);
		int index = 1;
		int i = 0;
		String message = "";
		for(i = 0; i < getShift(m,y); i++) {
			char space = (char) week1[i];
			space = ' ';
			System.out.print(space + "   ");
		}
		for(i = getShift(m,y); i < week1.length; i++) {
			week1[i] = index;
			System.out.print(week1[i] + "   ");
			index++;
		}//week1for
		System.out.println(" ");
		for(i = 0; i < week2.length; i++) {
			week2[i] = index;
			if(index >= 10) {
				System.out.print(week2[i] + "  ");
			}else {
				System.out.print(week2[i] + "   ");
			}
			index++;
		}//week2for
		System.out.println(" ");
		for(i = 0; i < week3.length; i++) {
			week3[i] = index;
			if(index >= 10) {
				System.out.print(week3[i] + "  ");
			}else {
				System.out.print(week3[i] + "   ");
			}
			index++;
		}//for
		System.out.println(" ");
		
		for(i = 0; i < week4.length; i++) {
			week4[i]= index;
			if(index >= 10) {
				System.out.print(week4[i] + "  ");
			}else {
				System.out.print(week4[i] + "   ");
			}//ifelse
			
			if(index == getMaxDays(m,y)) {
				index++;
				break;
			}else {
				index++;
			}
		}//for
		if(index == getMaxDays(m,y)) {
			System.out.println(" ");
			week5[0] = index;
			index++;
			System.out.print(week5[0] + "  ");
		}else if (index < getMaxDays(m,y)) {
			System.out.println(" ");
			for(i = 0; i < week5.length; i++) {
				week5[i] = index;
				System.out.print(week5[i] + "  ");
				if(index == getMaxDays(m,y)) {
					index++;
					break;
				}else {
					index++;
				}	
			}//for	
		}//ifelse
		
		if(index == getMaxDays(m,y)) {
			System.out.println(" ");
			week6[0] = index;
			System.out.print(week6[0] + "  ");
		}else if (index < getMaxDays(m,y)) {
			System.out.println(" ");
			for(i = 0; i < week6.length; i++) {
				week6[i] = index;
				System.out.print(week6[i] + "  ");
				if(index == getMaxDays(m,y)) {
					break;
				}else {
					index++;
				}	
			}//for	
		}//ifelse
	}//getCalendar
	
	
	public static int getShift(int m, int y) {
		int difference = y - 1500;
		int leap = difference/4;
		int centennial = 1600;
		int dayShift = 0;
		int shift = 0;
		if(y >= 1600) {
			for(int i = 0; i < y; i++) {
				if(centennial % 16 != 0) {
					leap--;
				}
				if((centennial + 100) < y) {
					centennial += 100;
				}else {
					break;
				}
			}//for
		}//if	
		if(isLeap(y) == true) {
			leap--;
		}//if
		
		
		int normal = difference - leap;
		
		leap *= 2;
		shift = leap + normal;
		
		if(m > 1) {
			for(int i = 1; i < m; i++) {
				
				dayShift += (getMaxDays(i,y)% 7);
			}
		}
		//JOptionPane.showMessageDialog(null, "shift is " + shift);
		shift += dayShift;
		shift %= 7;
		return shift;
	}//get leap
	
	public static String getMonthName(int m) {
		String name = "";
		//Switch statement matching up the numerical value of the user's birth month to its English name.
		switch(m) {
		case 1 :
			name = "January";
			break;
		case 2 :
			name = "February";
			break;
		case 3:
			name = "March";
			break;
		case 4 :
			name = "April";
			break;
		case 5 :
			name = "May";
			break;
		case 6 :
			name = "June";
			break;
		case 7:
			name = "July";
			break;
		case 8 :
			name = "August";
			break;
		case 9 :
			name = "September";
			break;
		case 10 :
			name = "October";
			break;
		case 11:
			name = "November";
			break;
		case 12 :
			name = "December";
			break;
			
		}//switch
		return name;
	}//getMonthname
	
	public static int getMaxDays( int m, int y) {
		int d = 0;
		//switch statement matching up the numerical value of the month input to its max number of days.
		switch(m) {
			case 1 :
			case 3 :
			case 5 :
			case 7 :
			case 8 :
			case 10 :
			case 12 :
				d = 31;
				break;
			case 4 :
			case 6 :
			case 9 :
			case 11 :
				d = 30;
				break;
			case 2:
				d = (isLeap(y))? 29 : 28;
				break;		
		}//switch
		
	return d;	
	}//getMaxDays
	
	//The purpose of this method is to determine whether or not the user's birth year is a leap year.
	 public static boolean isLeap (int y) {
		    if (y%4 == 0) {
		    	if(y%100 == 0 ) {
		    		if(y%16 == 0) {
		    			return true;
		    		}else {
		    			return false;
		    		}
		    	}else{
		    		return true;
		    	}
		    } else {
		      return false;
		    }
		  }//isLeap

}//CalendarThat
