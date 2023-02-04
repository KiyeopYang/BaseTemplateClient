import { supabase } from 'libs/supabase';
import { v4 as uuid } from 'uuid';

export const uploadImage = async (file: File) => {
  if (file) {
    const path = `${uuid()}${file.name.slice(file.name.lastIndexOf('.'))}`;
    const { error } = await supabase.storage.from('images').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });
    const { publicURL } = supabase.storage.from('images').getPublicUrl(path);
    if (!error && publicURL) {
      return publicURL;
    }
  }
  throw new Error('File upload error');
};
