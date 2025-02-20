import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { Project } from "@/types/project";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Function to fetch a specific project by ID
export async function fetchProjectById(
  projectId: string
): Promise<Project | null> {
  try {
    const projectDocRef = doc(db, "projects", projectId);
    const projectDoc = await getDoc(projectDocRef);

    if (projectDoc.exists()) {
      const projectData = {
        id: projectDoc.id,
        ...projectDoc.data(),
      } as Project;
      console.log(projectData);
      return projectData;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}
// fetch projects with an optional limit
export async function fetchProjects(maxProjects?: number): Promise<Project[]> {
  const projectsQuery = maxProjects
    ? query(collection(db, "projects"), limit(maxProjects))
    : collection(db, "projects");

  const querySnapshot = await getDocs(projectsQuery);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Project[];
}

// upload an img with the data

export const uploadImage = async (file: File) => {
  const imageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(imageRef, file);
  return getDownloadURL(imageRef);
};

// upload a project
export const addProjectToFirestore = async (projectData: Project) => {
  await addDoc(collection(db, "projects"), projectData);
};

// delete project by ID
export async function deleteProjectById(
  projectId: string | number
): Promise<boolean> {
  try {
    const projectDocRef = doc(db, "projects", String(projectId));
    await deleteDoc(projectDocRef);
    console.log(`Project ${projectId} deleted successfully!`);
    return true;
  } catch (error) {
    console.error("Error deleting project:", error);
    return false;
  }
}
