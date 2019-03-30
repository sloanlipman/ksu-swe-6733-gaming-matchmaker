package com.gamingMatchMaker.gamingMatchMaker.controller;

/**
 * This acts as an input/output buffer for saving the profile.  It takes the 
 * user details in and provides a mechanism for returning a descriptive error
 * message. 
 * @author Moffett
 *
 */
public class SaveChangesAttempt {
	private UserDetail ud;
	private String msg;
	
	public SaveChangesAttempt(UserDetail details) {
		ud = details;
		msg = new String();
	}

	/**
	 * Read out any error message.
	 * @return the msg
	 */
	public String getMessage() { return msg; }

	/**
	 * Sets any error message if one is needed.
	 * @param msg the msg to set
	 */
	public void setMessage(String msg) { this.msg = msg; }

	/**
	 * Read out the user details.
	 * @return the ud
	 */
	public UserDetail getUd() { return ud; }

}


