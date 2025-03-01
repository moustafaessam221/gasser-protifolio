import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { Message, Project, SentMessageType } from "@/types/project";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

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

// fetch featured projects only
export async function fetchFeaturedProjects(): Promise<Project[]> {
  try {
    const projectsRef = collection(db, "projects");
    const q = query(projectsRef, where("featured", "==", true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Project[];
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

// change feautred from true to false or vice versa
export async function changeFeatured(
  projectId: string | number
): Promise<boolean> {
  try {
    const projectDocRef = doc(db, "projects", String(projectId));
    const project = await getDoc(projectDocRef);
    if (project.exists()) {
      const updatedFeatured = !project.data().featured;
      await updateDoc(projectDocRef, { featured: updatedFeatured });
      return updatedFeatured;
    } else {
      console.log("No such project!");
      return false;
    }
  } catch (error) {
    console.error("Error updating project:", error);
    return false;
  }
}

// upload an img with the data
export const uploadImage = async (file: File) => {
  const imageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(imageRef, file);
  return getDownloadURL(imageRef);
};

// upload a project
export const addProjectToFirestore = async (
  projectData: Omit<Project, "id">
) => {
  await addDoc(collection(db, "projects"), projectData);
};

// delete project by ID
export async function deleteProjectById(
  projectId: string | number
): Promise<boolean> {
  try {
    const projectDocRef = doc(db, "projects", String(projectId));
    const projectDoc = await getDoc(projectDocRef);

    if (projectDoc.exists()) {
      const projectData = projectDoc.data() as Project;

      // delete images from featured imagess
      for (const imagePath of projectData.featured_Images) {
        const imageRef = ref(storage, imagePath);
        await deleteObject(imageRef);
      }

      // delete the device image
      if (projectData.device) {
        const deviceRef = ref(storage, projectData.device);
        await deleteObject(deviceRef);
      }

      // delete the project background image
      if (projectData.bg_img) {
        const bgImgRef = ref(storage, projectData.bg_img);
        await deleteObject(bgImgRef);
      }

      await deleteDoc(projectDocRef);
      console.log(`Project ${projectId} and its images deleted successfully!`);
      return true;
    } else {
      console.log("No such project!");
      return false;
    }
  } catch (error) {
    console.error("Error deleting project:", error);
    return false;
  }
}

// fetch messages
export async function fetchMessages(): Promise<Message[]> {
  try {
    const messageRef = collection(db, "messages");
    const querySnapshot = await getDocs(messageRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Message[];
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
}

// change from read to unread or vice versa
export async function changeReadStatus(messageId: string | number) {
  try {
    const messageDocRef = doc(db, "messages", String(messageId));
    const message = await getDoc(messageDocRef);
    if (message.exists()) {
      const updatedRead = !message.data().read; // toggle read status
      await updateDoc(messageDocRef, { read: updatedRead }); // update read status
      return updatedRead;
    } else {
      console.log("No such message!");
      return false;
    }
  } catch (error) {
    console.error("Error updating message:", error);
    return false;
  }
}

// send a message
export const sendMessage = async (messageData: SentMessageType) => {
  try {
    await addDoc(collection(db, "messages"), messageData);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

// delete message by ID
export async function deleteMessageById(messageId: string | number) {
  try {
    const messageDocRef = doc(db, "messages", String(messageId));
    await deleteDoc(messageDocRef);
    console.log(`Message ${messageId} deleted successfully!`);
  } catch (error) {
    console.error("Error deleting message:", error);
  }
}

// fetch all messages with read status false
export async function fetchUnreadMessages(): Promise<Message[]> {
  try {
    const messageRef = collection(db, "messages");
    const q = query(messageRef, where("read", "==", false));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Message[];
  } catch (error) {
    console.error("Error fetching unread messages:", error);
    return [];
  }
}

// import the bio
export async function fetchBio(): Promise<string> {
  try {
    const bioRef = doc(db, "site-edit", "profile");
    const bioSnapshot = await getDoc(bioRef);
    const bio = bioSnapshot.data()?.bio as string;
    return bio;
  } catch (error) {
    console.error("Error fetching bio:", error);
    return "";
  }
}

// update the bio
export async function updateBio(bio: string) {
  try {
    const bioRef = doc(db, "site-edit", "profile");
    await updateDoc(bioRef, { bio: bio });
  } catch (error) {
    console.error("Error updating bio:", error);
  }
}
