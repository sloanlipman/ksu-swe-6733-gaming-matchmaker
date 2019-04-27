package com.gamingMatchMaker.gamingMatchMaker.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OrderBy;
import javax.persistence.Table;

@Entity
@Table(name="priority_map")
public class PriorityMap {

	@EmbeddedId
	private PriorityMapKey key;
	
	@ManyToOne
	@MapsId("userID")
//	@JoinColumn(name = "id")
	private UserRec user;
	
	@ManyToOne
	@MapsId("priorityID")
//	@JoinColumn(name = "id")
	private Priority priority;
	
	@Column(name = "the_order")
	@OrderBy
	private int order;

	public PriorityMap() {
		//do I need to do anything
	}
	
	public PriorityMap(PriorityMapKey key, UserRec user, Priority priority, int order) {
		this.key = key;
		this.user = user;
		this.priority = priority;
		this.order = order;
	}
	
	public PriorityMap(UserRec user, Priority priority, int order) {
		PriorityMapKey pmk = new PriorityMapKey(user.getId(), priority.getId());
		this.key = pmk;
		this.user = user;
		this.priority = priority;
		this.order = order;
	}

	/**
	 * @return the key
	 */
	public PriorityMapKey getKey() {
		return key;
	}

	/**
	 * @param key the key to set
	 */
	public void setKey(PriorityMapKey key) {
		this.key = key;
	}

	/**
	 * @return the user
	 */
	public UserRec getUser() {
		return user;
	}

	/**
	 * @param user the user to set
	 */
	public void setUser(UserRec user) {
		this.user = user;
	}

	/**
	 * @return the priority
	 */
	public Priority getPriority() {
		return priority;
	}

	/**
	 * @param priority the priority to set
	 */
	public void setPriority(Priority priority) {
		this.priority = priority;
	}

	/**
	 * @return the order
	 */
	public int getOrder() {
		return order;
	}

	/**
	 * @param order the order to set
	 */
	public void setOrder(int order) {
		this.order = order;
	}
	
	
}
