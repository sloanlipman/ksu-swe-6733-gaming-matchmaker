package com.gamingMatchMaker.gamingMatchMaker.model;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name="users_interests")
public class Interest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "int(11)")
	private int id;
    
    private String activity_name;

    @ManyToMany(mappedBy = "interests")
    private Set<UserRec> users = new HashSet<>();
    
    public Interest() {}
    
	public Interest(int id, String activity_name) {
		this.id = id;
		this.activity_name = activity_name;
	}
	
	public Interest(Interest original) {
		this.id = original.id;
		this.activity_name = original.activity_name;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getActivity_name() {
		return activity_name;
	}

	public void setActivity_name(String activity_name) {
		this.activity_name = activity_name;
	}
    
}
