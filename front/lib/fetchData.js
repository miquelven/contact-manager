import axios from "axios";

export async function deleteContact(userId, id) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${userId}/${id}`
    );
    if (response.data.length > 0) {
      console.log(response.data);

      return { success: response.data };
    }
    return { erro: "Algo deu errado!" };
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function addContact(email, phone, name, userId, status) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
      {
        userId,
        name,
        email,
        phone,
        status,
      }
    );
    if (response.data) {
      return { success: "Contato salvo com sucesso!" };
    }
  } catch (error) {
    return { erro: error.response.data };
  }
}

export async function updateContact(userId, id, name, email, phone, status) {
  // Verificar se os campos não estão vazios
  if (!name && !email && !phone && !status) {
    return { erro: "Pelo menos um campo deve ser preenchido para atualizar." };
  }

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${userId}/${id}`,
      {
        name,
        email,
        phone,
        status,
      }
    );

    if (response.data.length > 0) {
      console.log(response.data);
      return { success: response.data };
    }

    return { erro: "Algo deu errado!" };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { erro: "Erro ao atualizar contato." };
  }
}

export async function updateLocation(data) {
  const { id, city, street, neighborhood, number, zipCode } = data;

  if (!city && !street && !neighborhood && !number && !zipCode) {
    return { erro: "Pelo menos um campo deve ser preenchido para atualizar." };
  }

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${id}`,
      {
        city,
        street,
        neighborhood,
        number,
        zipCode,
      }
    );

    return { success: response.data };
  } catch (error) {
    console.error("Error updating data:", error);
    return { erro: "Erro ao atualizar localização." };
  }
}
