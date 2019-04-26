package com.gamingMatchMaker.gamingMatchMaker.model;

import java.util.Set;
import javax.persistence.*;


@Entity
@Table(name="priorities")
public class Priority {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id", columnDefinition="int(11)")
		private int id;
		private String priorityName;

    @ManyToMany
    private Set<UserRec> users;

	public Priority() {}

	public Priority(Priority original) {
		this.id = original.id;
		this.priorityName = original.priorityName;
	}

	public Priority(String name, Set<UserRec> users) {
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
