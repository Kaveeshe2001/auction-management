using auction_backend.Dto.ContactUs;
using auction_backend.Models;

namespace auction_backend.Mappers
{
    public static class ContactMappers
    {
        public static ContactDto ToContactDto(this Contactus contactModel)
        {
            return new ContactDto
            {
                Id = contactModel.Id,
                Name = contactModel.Name,
                Email = contactModel.Email,
                Subject = contactModel.Subject,
                Message = contactModel.Message,
            };
        }

        public static Contactus ToContactFromCreate(this CreateContactDto createContactDto)
        {
            return new Contactus
            {
                Name = createContactDto.Name,
                Email = createContactDto.Email,
                Subject = createContactDto.Subject,
                Message = createContactDto.Message,
            };
        }
    }
}
