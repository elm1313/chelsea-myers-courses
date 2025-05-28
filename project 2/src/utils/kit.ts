export const openKitForm = (formId: string) => {
  console.log('Attempting to open Kit form:', formId);
  
  // Wait for Kit script to load
  const waitForKit = () => {
    // @ts-ignore - Kit types not available
    if (typeof window.formkit === 'undefined') {
      console.log('Kit not loaded yet, retrying...');
      setTimeout(waitForKit, 100);
      return;
    }

    try {
      // @ts-ignore
      window.formkit.toggle(formId);
      console.log('Kit form toggled successfully');
    } catch (error) {
      console.error('Error toggling Kit form:', error);
    }
  };

  waitForKit();
};