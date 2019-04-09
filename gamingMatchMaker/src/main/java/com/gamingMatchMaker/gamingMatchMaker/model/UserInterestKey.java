package com.gamingMatchMaker.gamingMatchMaker.model;

import java.io.Serializable;

import javax.persistence.*;

@Embeddable
public class UserInterestKey implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Column(name="user_id")
	private long userID;
	
	@Column(name="interest_id")
	private long interestID;

	public UserInterestKey(long userID, long interestID) {
		super();
		this.userID = userID;
		this.interestID = interestID;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (interestID ^ (interestID >>> 32));
		result = prime * result + (int) (userID ^ (userID >>> 32));
		return result;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserInterestKey other = (UserInterestKey) obj;
		if (interestID != other.interestID)
			return false;
		if (userID != other.userID)
			return false;
		return true;
	}

	/**
	 * @return the userID
	 */
	public long getUserID() {
		return userID;
	}

	/**
	 * @param userID the userID to set
	 */
	public void setUserID(long userID) {
		this.userID = userID;
	}

	/**
	 * @return the interestID
	 */
	public long getInterestID() {
		return interestID;
	}

	/**
	 * @param interestID the interestID to set
	 */
	public void setInterestID(long interestID) {
		this.interestID = interestID;
	}
	
	
}
