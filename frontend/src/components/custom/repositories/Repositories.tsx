"use client";
import React from 'react';
import GithubRepos from '@/components/custom/repositories/GithubRepos';
import GitlabRepos from '@/components/custom/repositories/GitlabRepos';
import BitbucketRepos from '@/components/custom/repositories/BitbucketRepos';

type RepositoriesProps = {
  selected: string;
}

export default function Repositories({ selected }: RepositoriesProps) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-6">Select a Repository to Deploy</h2>
      
      {selected === "github" && <GithubRepos />}
      {selected === "gitlab" && <GitlabRepos />}
      {selected === "bitbucket" && <BitbucketRepos />}
    </div>
  );
}
