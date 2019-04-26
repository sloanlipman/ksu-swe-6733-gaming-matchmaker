package com.gamingMatchMaker.gamingMatchMaker.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="priorities")
public class Priority {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id", columnDefinition="int(11)")
    private int id;

    @Column(name="name")
    private String priorityName;

    @OneToMany
    private Set<UserRec> users;

	public Priority() {
	}
	public Priority(Priority original) {
		this.id = original.id;
		this. priorityName = original.priorityName;
	}

//	public Priority(int id, String name) {
//		this.id = id;
//		this.name = name;
//		users = new HashSet<UserRec>();
//	}

	public Priority(int id, String name, Set<UserRec> users) {
		this.id = id;
		this.priorityName = name;
		this.users = users;
	}

	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return priorityName;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.priorityName = name;
	}

	/**
	 * @return the users
	 */
	public Set<UserRec> getUsers() {
		return users;
	}

	/**
	 * @param users the users to set
	 */
	public void setUsers(Set<UserRec> users) {
		this.users = users;
	}
    
}
