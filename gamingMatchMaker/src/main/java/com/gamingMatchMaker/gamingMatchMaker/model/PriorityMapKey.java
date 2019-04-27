package com.gamingMatchMaker.gamingMatchMaker.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class PriorityMapKey implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Column(name="userID")
	private long userID;
	
	@Column(name="priorityID")
	private long priorityID;

	public PriorityMapKey() {
		this.userID = 0;
		this.priorityID = 0;
	}
	
	public PriorityMapKey(long userID, long priorityID) {
		this.userID = userID;
		this.priorityID = priorityID;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		PriorityMapKey pmk = (PriorityMapKey) obj;
		return (pmk.priorityID == this.priorityID && pmk.userID == this.userID);
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		return super.hashCode();
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
	 * @return the priorityID
	 */
	public long getPriorityID() {
		return priorityID;
	}

	/**
	 * @param priorityID the priorityID to set
	 */
	public void setPriorityID(long priorityID) {
		this.priorityID = priorityID;
	}

	/**
	 * @return the serialversionuid
	 */
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}
