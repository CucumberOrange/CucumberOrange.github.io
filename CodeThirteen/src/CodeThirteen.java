import java.util.Scanner;
import java.util.ArrayList;
public class CodeThirteen {
	public static void main(String args[]) {
		String code = "";
		String message = "";
		Scanner in = new Scanner(System.in);
		int num1 = 0;
		int num2 = 0;
		int num3 = 0;
		String replay = "y";
		//int choice = 0;
		String wrongSum = "The numbers of this code must add up to 13.";
		String noDash = "The numbers must be separated by dashes.";
		String character = "This is not a number.";
		String missingComponent = "Code thirteen requires three numbers.";
		do {
			System.out.println("Please enter the form of Code 13 you wish to use, in the form of three numbers separated by dashes (-): ");
			code = in.nextLine();
			if(code.length() != 5) {
				System.out.println(missingComponent);
				continue;
			}//if
			
			num1 = code.charAt(0)- 48;
			num2 = code.charAt(2) - 48;
			num3 = code.charAt(4) - 48;
			if((num1 + num2 + num3) != 13) {
				System.out.println(wrongSum);
				continue;
			}else if(code.charAt(1) != 45|| code.charAt(3) != 45){
				System.out.println(noDash);
				continue; 
			}else if((!(num1 >= 0 && num1 <= 9)  || num1 == 32) || (!(num2 >= 0 && num2 <= 9 )|| num2 == 32) || (!(num3 >= 0 && num3 <= 9 )|| num3 == 32)) {
				System.out.println(character);
				continue;
			}else {
				break;
			}//else
		}while(true);
		do {
			in = new Scanner(System.in);
			System.out.println("Please enter your message: ");
			message = in.nextLine();
			String upperMessage = message.toUpperCase();
			
			char [] coder = new char[26];
			int i = 0;
			char letter = 'A';
			for(i = 0; i <= (num1 * 2) - 1; i++) {
				coder[i] = letter;
				letter+= num1;
				if(i % 2 != 0) {
					letter -= (num1 * 2);
					letter++;
				}//if
			}//for
				
			letter+= num1;
				
			for(i = num1 * 2; i <= ((num1 + num2) * 2) - 1; i++) {
				coder[i] = letter;
				letter+= num2;
				if(i % 2 != 0) {
					letter -= (num2 * 2);
					letter++;
				}//if
			}//for
			letter+= num2;
				
			for(i = ((num1 + num2) * 2); i < coder.length; i++) {
				coder[i] = letter;
				letter+= num3;
				if(i % 2 != 0) {
					letter -= (num3 * 2);
					letter++;
				}//if
			}//for
			
			do {
				System.out.println("If you would like to encode this message, press 1. If you would like to decode it, press 2:");
				int choice = in.nextInt();
				if(choice == 1) {
					makeCode(code);
					encode(coder, upperMessage);
					break;
				}else if(choice == 2) {
					makeCode(code);
					decode(coder,upperMessage);
					break;
				}else if(choice > 2) {
					System.out.println("You may only choose 1 or 2.");
					continue;
				}else {
					break;
				}//else
			}while(true);
			System.out.println(" ");
			System.out.println("Would you like to continue? (y|n)");
			replay = in.next();
			if(replay.equals("y")) {
				continue;
			}else {
				break;
			}//else
		}while(true);
			
	}//main
	
	public static char[] makeCode(String code) {
		int num1 = code.charAt(0)- 48;
		int num2 = code.charAt(2) - 48;
		int num3 = code.charAt(4) - 48;
		
		char [] coder = new char[26];
		int i = 0;
		char letter = 'A';
		for(i = 0; i <= (num1 * 2) - 1; i++) {
			coder[i] = letter;
			letter+= num1;
			if(i % 2 != 0) {
				letter -= (num1 * 2);
				letter++;
			}//if
		}//for
			
		letter+= num1;
			
		for(i = num1 * 2; i <= ((num1 + num2) * 2) - 1; i++) {
			coder[i] = letter;
			letter+= num2;
			if(i % 2 != 0) {
				letter -= (num2 * 2);
				letter++;
			}//if
		}//for
		letter+= num2;
			
		for(i = ((num1 + num2) * 2); i < coder.length; i++) {
			coder[i] = letter;
			letter+= num3;
			if(i % 2 != 0) {
				letter -= (num3 * 2);
				letter++;
			}//if
		}//for
		 
		return coder;
	}//makeCode
	//Take in the coded String and the message, output the decoded message
	public static String decode(char[] coder,String upperMessage) {
	
		char [] messageArray = upperMessage.toCharArray();
		int i = 0;
		String s = new String(coder);
		for(i = 0;i < messageArray.length; i++) {
			int index = s.indexOf(messageArray[i]);
			if(messageArray[i] >= 'A' && messageArray[i] <= 'Z') {
				if(s.indexOf(messageArray[i]) % 2 != 0) {
					index--;
					messageArray[i] = coder[index];
					System.out.print(messageArray[i]);
				}else if (s.indexOf(messageArray[i]) % 2 == 0) {
					index++;
					messageArray[i] = coder[index];
					System.out.print(messageArray[i]);
				}//else
			}else {
				System.out.print(messageArray[i]);
			}//ifElse
		}//for
			String decodedMessage = new String(messageArray);
			return decodedMessage;
	}//decode
	
	
	public static String encode(char[] coder,String upperMessage) {
		int i = 0;
		char [] messageArray = upperMessage.toCharArray();
		
		String s = new String (coder);
		for(i = 0;i < messageArray.length; i++) {
			int index = s.indexOf(messageArray[i]);
			if(messageArray[i] >= 'A' && messageArray[i] <= 'Z') {
				if(s.indexOf(messageArray[i]) % 2 != 0) {
					index--;
					messageArray[i] = coder[index];
					System.out.print(messageArray[i]);
				}else if (s.indexOf(messageArray[i]) % 2 == 0) {
					index++;
					messageArray[i] = coder[index];
					System.out.print(messageArray[i]);
				}
			}else {
				System.out.print(messageArray[i]);
			}//ifElse
		}//for
			String encodedMessage = new String(messageArray);
			
			return encodedMessage;
	}//encode
		

}//codeThirteen
