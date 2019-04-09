package com.gamingMatchMaker.gamingMatchMaker.model;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name="interests")
public class Interest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "int(11)")
	private long id;
    
    @Column(name = "activity_name")
    private String activity;

    @ManyToMany(mappedBy = "hobbies")
    private Set<UserRec> users = new HashSet<>();
    
    public Interest() {}
    
    public Interest(String name) {
    	this.activity = name;
    }
    
	public Interest(int id, String activity) {
		this.id = id;
		this.activity = activity;
	}
	
	public Interest(Interest original) {
		this.id = original.id;
		this.activity = original.activity;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getActivity() {
		return activity;
	}

	public void setActivity(String activity) {
		this.activity = activity;
	}
    
}
