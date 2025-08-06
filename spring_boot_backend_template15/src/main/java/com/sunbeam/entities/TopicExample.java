package com.sunbeam.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "topic_examples")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopicExample {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "example_id")
    private Long exampleId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;
    
    @Column(name = "example_text", nullable = false, columnDefinition = "TEXT")
    private String exampleText;
    
    @Column(name = "display_order")
    private Integer displayOrder = 0;
} 