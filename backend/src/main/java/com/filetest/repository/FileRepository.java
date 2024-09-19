package com.filetest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.filetest.model.File;

public interface FileRepository extends JpaRepository<File, Long> {
  List<File> findByPublished(boolean published);

  List<File> findByTitleContainingIgnoreCase(String title);
}
